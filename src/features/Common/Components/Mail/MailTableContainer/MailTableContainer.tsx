import _ from 'lodash';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { DraftActionEnum, useDraftsDispatch } from '../../../../../app/Context/DraftContext';
import { ComposeViewTypeEnum, TypeChat } from '../../../../../app/Enums/commonEnums';
import { setIsShowFullSidebar, setMailItemStyle } from '../../../../../app/Slices/layoutSlice';
import { BaseQueryParamsType, MailType } from '../../../../../app/Types/commonTypes';
import useDispatch from '../../../../Hooks/useDispatch';
import useNotify from '../../../../Hooks/useNotify';
import useSelector from '../../../../Hooks/useSelector';
import ComposeModalMobile from '../../../WorkSpace/ButtonComposeFixed/ComposeModalMobile';
import LoadingHeader from '../../Loading/LoadingHeader';
import { EmailType } from '../../SelectMultiEmail/SelectMultiEmail';
import MailTable from '../MailTable';
import HeaderMailTable from './HeaderTable/HeaderMailTable';
import { MetaType } from './HeaderTable/PaginationTable';
import ViewMailMobile from './ViewMailMobile/ViewMailMobile';
import ViewMailSpace from './ViewMailSpace/ViewMailSpace';

interface MailTableContainerProp {
  mailData: Array<MailType>;
  isLoading: boolean;
  type: TypeChat;
  readEmail?: (arrayId: Array<number>) => void;
  unReadEmail?: (arrayId: Array<number>) => void;
  fetchData: () => void;
  deleteEmail?: (arrayId: Array<number>) => void;
  meta: MetaType;
  onChangePage: (page: number) => void;
  onRestoreEmail?: (ids: Array<number>) => void;
  handleChangeSearchTerm?: (query: BaseQueryParamsType, type: string) => void;
  onRateStar?: (id: number, value: boolean) => void;
  onRemoveItem?: (id: number) => void;
  actionArray?: Array<string>;
  emptyComponent?: React.ReactNode;
}

export interface SentListEmailProp {
  id?: number;
  email_address: string;
}

const MailTableContainer = ({
  onRateStar,
  handleChangeSearchTerm,
  onRestoreEmail,
  mailData,
  isLoading,
  type,
  readEmail,
  unReadEmail,
  fetchData,
  deleteEmail,
  onChangePage,
  meta,
  onRemoveItem,
  actionArray = ['datetime'],
  emptyComponent,
}: MailTableContainerProp) => {
  const [isShowViewMailSpace, setIsShowViewMailSpace] = useState(false);
  const [isShowViewMailMobile, setIsShowViewMailMobile] = useState(false);
  const [selectRows, setSelectRows] = useState<Array<number>>([]);
  const [selectedMail, setSelectedMail] = useState<MailType | null>(null);
  const [isShowShadow, setIsShowShadow] = useState(false);
  const [isShowComposeMobile, setIsShowComposeMobile] = useState(false);
  const [emailReply, setEmailReply] = useState<Array<EmailType>>([]);
  const [contentForward, setContentForward] = useState('');
  const [isShowLoading, setIsShowLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);
  const headerTableRef = useRef<HTMLDivElement>(null);
  const viewMailRef = useRef<HTMLDivElement>(null);
  const dragBarSide = useRef<HTMLDivElement>(null);
  const isClicked = useRef(false);

  const isShowFullSideBar = useSelector((state) => state.layout.isShowFullSidebar);
  const emailUser = useSelector((state) => state.user.email);

  const toast = useNotify();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const dispatch2 = useDraftsDispatch();

  const isChecked = useMemo(() => {
    if (!_.isEmpty(selectRows)) return true;
    return false;
  }, [selectRows]);

  const convertArrayEmailString = (arrayEmail: Array<SentListEmailProp>) => {
    return arrayEmail.map((item) => ({ email: item.email_address }));
  };

  const handleSelectMailTypeTrash = (mail: MailType) => {
    const listEmail = convertArrayEmailString(mail.sents_email_address || []);
    dispatch2({
      type: DraftActionEnum.ADD_COMPOSE,
      uuid: nanoid(),
      viewType: ComposeViewTypeEnum.POPUP,
      recipient: listEmail as unknown as EmailType[],
      subject: mail.subject,
      body: mail.body,
    });
  };

  const handleSelectMail = (mail: MailType) => {
    if (type === TypeChat.DRAFT) {
      if (window.innerWidth < 1024) {
        setSelectedMail(mail);
        setIsShowComposeMobile(true);
        return;
      }
      handleSelectMailTypeTrash(mail);
      return;
    }
    if (!mail?.read && _.isFunction(readEmail)) readEmail([mail.id]);
    setSelectedMail(mail);
    if (window.innerWidth < 1024) {
      setIsShowViewMailMobile(true);
      return;
    }
    if (window.innerWidth < 1280 && window.innerWidth >= 1024) {
      dispatch(setIsShowFullSidebar(false));
    }
    setIsShowViewMailSpace(true);
    if (tableRef.current !== null) {
      if (window.innerWidth < 1280) {
        tableRef.current.style.width = '33.3%';
      }
      if (window.innerWidth >= 1280) {
        tableRef.current.style.width = '50%';
      }
    }
  };

  const handleClose = () => {
    setSelectedMail(null);
    setIsShowViewMailSpace(false);
    if (tableRef.current !== null) {
      tableRef.current.style.width = '100%';
    }
  };

  const handleSelectRows = (idRows: number, checked: boolean) => {
    if (checked) {
      return setSelectRows((prev) => _.uniq([...prev, idRows]));
    }
    return setSelectRows((prev) => prev.filter((item) => item !== idRows));
  };

  const handleSelectAll = (checked: boolean) => {
    const selectAll = mailData.map((item) => item?.id);
    if (checked) {
      return setSelectRows(selectAll);
    }
    return setSelectRows([]);
  };

  const handleClickReadSelectRows = () => {
    if (!_.isFunction(readEmail) || _.isEmpty(selectRows)) return;
    readEmail(selectRows)
      .then(() => {
        setSelectRows([]);
        fetchData();
      })
      .catch(() => toast.error(t('action_error')));
  };

  const handleClickDeleteMultiEmail = () => {
    if (!_.isFunction(deleteEmail) || _.isEmpty(selectRows)) return;
    setIsShowLoading(true);
    deleteEmail(selectRows)
      .then(() => {
        setSelectRows([]);
        fetchData();
      })
      .catch(() => toast.error(t('action_error')))
      .finally(() => setIsShowLoading(false));
  };

  const handleClickDelete = (id: number) => {
    if (!_.isFunction(deleteEmail)) return;
    setIsShowLoading(true);
    deleteEmail([id])
      .then(() => {
        setSelectedMail(null);
        fetchData();
      })
      .catch(() => toast.error(t('action_error')))
      .finally(() => setIsShowLoading(false));
  };

  const handleRestoreMailIds = () => {
    if (!_.isFunction(onRestoreEmail) || _.isEmpty(selectRows)) return;
    setIsShowLoading(true);
    onRestoreEmail(selectRows)
      .then(() => {
        setSelectRows([]);
        fetchData();
      })
      .catch(() => toast.error(t('action_error')))
      .finally(() => setIsShowLoading(false));
  };

  const handleRestore = (id: number) => {
    if (!_.isFunction(onRestoreEmail)) return;
    setIsShowLoading(true);
    onRestoreEmail([id])
      .then(() => fetchData())
      .catch(() => toast.error(t('action_error')))
      .finally(() => setIsShowLoading(false));
  };

  const onMouseDown = useCallback((event: MouseEvent) => {
    event.preventDefault();
    isClicked.current = true;
  }, []);

  const onMouseUp = useCallback(() => {
    isClicked.current = false;
  }, []);

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      const minWidthViewMail = isShowFullSideBar ? window.innerWidth - 500 : window.innerWidth - 520;
      if (!isClicked.current) return;
      if (event.clientX <= (isShowFullSideBar ? 730 : 540) || event.clientX >= minWidthViewMail) {
        return;
      }

      if (dragBarSide.current !== null) {
        dragBarSide.current.style.left = `${
          event.clientX - (containerRef.current?.getBoundingClientRect().left ?? 0)
        }px`;
      }

      if (tableRef.current !== null && !isShowFullSideBar) {
        tableRef.current.style.width = `${event.clientX - 95}px`;
      }
      if (tableRef.current !== null && isShowFullSideBar) {
        tableRef.current.style.width = `${event.clientX - 283}px`;
      }

      if (headerTableRef.current && !isShowFullSideBar) {
        headerTableRef.current.style.width = `${event.clientX - 95}px`;
      }
      if (headerTableRef.current && isShowFullSideBar) {
        headerTableRef.current.style.width = `${event.clientX - 283}px`;
      }
    },
    [isShowFullSideBar],
  );

  useEffect(() => {
    if (isShowViewMailSpace && headerTableRef.current !== null) {
      if (window.innerWidth < 1280) {
        headerTableRef.current.style.width = '33.3%';
      }
      if (window.innerWidth >= 1280) {
        headerTableRef.current.style.width = '50%';
      }
    }
    if (!isShowViewMailSpace && headerTableRef.current !== null) {
      headerTableRef.current.style.width = '100%';
    }
    if (
      isShowViewMailSpace &&
      dragBarSide.current &&
      containerRef.current &&
      tableRef.current &&
      viewMailRef.current &&
      headerTableRef.current !== null
    ) {
      dragBarSide.current.style.left = `${window.innerWidth / 2 - 45}px`;
      dragBarSide.current.addEventListener('mousedown', onMouseDown);
      dragBarSide.current.addEventListener('mouseup', onMouseUp);
      if (containerRef.current !== null) {
        containerRef.current.addEventListener('mousemove', onMouseMove);
        containerRef.current.addEventListener('mouseup', onMouseUp);
      }

      return () => {
        if (dragBarSide.current && containerRef) {
          dragBarSide.current.removeEventListener('mousedown', onMouseDown);
          dragBarSide.current.removeEventListener('mouseup', onMouseUp);
          containerRef.current?.removeEventListener('mousemove', onMouseMove);
          containerRef.current?.removeEventListener('mouseup', onMouseUp);
        }
      };
    }
    return undefined;
  }, [isShowViewMailSpace, isShowFullSideBar]);

  useEffect(() => {
    if (headerTableRef === null) return;
    if (
      headerTableRef.current?.getBoundingClientRect().width &&
      headerTableRef.current?.getBoundingClientRect().width < 640
    ) {
      dispatch(setMailItemStyle('classic'));
    }
  }, [headerTableRef]);

  useEffect(() => {
    if (isShowFullSideBar && window.innerWidth < 1280 && window.innerWidth >= 1024) {
      handleClose();
    }
  }, [isShowFullSideBar]);

  const contentDefaultForward = `<br><br><p>---------- Forwarded message -------- <br> From: ${selectedMail?.from_user?.email} <br>Date: ${selectedMail?.created_at}<br>Subject: ${selectedMail?.subject}<br>To: ${emailUser}</p>`;

  return (
    <div
      className={twMerge('h-full w-full text-center', isShowViewMailSpace && 'flex overflow-hidden')}
      ref={containerRef}
    >
      <div
        className={twMerge(
          'h-full w-full',
          isShowViewMailSpace && 'w-1/2',
          isShowViewMailSpace && window.innerWidth < 1280 && 'w-1/3',
        )}
        ref={tableRef}
      >
        <div className={twMerge('', tableRef.current && `w-${tableRef.current.style.width}`)}>
          <HeaderMailTable
            onChangeSearchTerm={handleChangeSearchTerm}
            type={type}
            onClickRestoreSelectRows={handleRestoreMailIds}
            onClickReadSelectRows={handleClickReadSelectRows}
            onClickDeleteSelectRows={handleClickDeleteMultiEmail}
            // isShowViewMailSpace={isShowViewMailMobile}
            ref={headerTableRef}
            actionArray={actionArray}
            isShowShadow={isShowShadow}
            isShowCheckboxHeader={isShowViewMailSpace}
            isChecked={isChecked}
            onClickSelectAll={handleSelectAll}
            onCloseViewMailSpace={() => {
              setIsShowViewMailSpace(false);
              setSelectedMail({} as MailType);
            }}
            meta={meta}
            onChangePage={onChangePage}
          />
        </div>
        <MailTable
          onRemoveItem={onRemoveItem}
          unReadEmail={unReadEmail}
          onRateStar={onRateStar}
          onClickDeleteMail={handleClickDelete}
          onClickRestoreMail={handleRestore}
          type={type}
          isLoading={isLoading}
          data={mailData}
          onChangeShowShadow={setIsShowShadow}
          onChangeSelectRows={handleSelectRows}
          onClickShowMail={handleSelectMail}
          selectRows={selectRows}
          selectedMail={selectedMail && selectedMail}
          emptyComponent={emptyComponent}
        />
      </div>
      {isShowViewMailSpace && (
        <div className="z-10 h-full w-full flex-1 bg-white" ref={viewMailRef}>
          <ViewMailSpace handleClose={handleClose} mailData={selectedMail} ref={dragBarSide} type={type} />
        </div>
      )}
      <ViewMailMobile
        onClickRestoreMail={handleRestore}
        onClickDeleteMail={handleClickDelete}
        onRemoveItem={onRemoveItem}
        onRateStar={onRateStar}
        mailData={selectedMail}
        isOpen={isShowViewMailMobile}
        type={type}
        onClose={() => {
          setIsShowViewMailMobile(false);
          setContentForward('');
          setEmailReply([]);
        }}
        onClickForward={() => {
          setIsShowComposeMobile(true);
          setContentForward(`${contentDefaultForward} <br><br> ${selectedMail?.body}`);
        }}
        onClickReply={() => {
          setIsShowComposeMobile(true);
          setEmailReply([{ email: selectedMail?.email_account?.email_address || '' }]);
        }}
        onClickReplyAll={() => setIsShowComposeMobile(true)}
      />
      <ComposeModalMobile
        recipient={emailReply}
        isOpen={isShowComposeMobile}
        mail={selectedMail}
        onClose={() => {
          setIsShowComposeMobile(false);
          setContentForward('');
          setEmailReply([]);
        }}
        dataForward={contentForward}
      />
      <LoadingHeader isShow={isShowLoading} />
    </div>
  );
};

export default MailTableContainer;
