import _ from 'lodash';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgFormatColor } from 'react-icons/cg';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiLink2, FiMoreVertical } from 'react-icons/fi';
import { IoMdAttach } from 'react-icons/io';
import { IoImageOutline } from 'react-icons/io5';
import { MdTagFaces } from 'react-icons/md';
// eslint-disable-next-line import/no-extraneous-dependencies
import striptags from 'striptags';
import { twMerge } from 'tailwind-merge';
import { ComposeViewTypeEnum } from '../../../../../app/Enums/commonEnums';
import { ComposePopupStyleType, MailType } from '../../../../../app/Types/commonTypes';
import ComposePopupButtonMore from './ComposePopupButtonMore/ComposePopupButtonMore';
import ComposePopupButtonSend from './ComposePopupButtonSend';
import ComposePopupHeader from './ComposePopupHeader';
import ComposePopupInput from './ComposePopupInput';
import ComposePopupRecipient from './ComposePopupRecipient/ComposePopupRecipient';
import ComposePopupSelectTimeModal from './ComposePopupSelectTimeModal';
import ComposePopupToolbarItem from './ComposePopupToolbarItem';
import WriterCompose from './EditorWriterCompose';
import ReplyAndForwardHeader from './ReplyAndForwardHeader';

export interface ComposePopupProps {
  composeClassName?: string;
  viewType?: string;
  subject: string;
  debounceSubject: string;
  fromMail?: MailType;
  composePopupStyle?: ComposePopupStyleType;
  setViewType: Dispatch<SetStateAction<ComposeViewTypeEnum>>;
  onClose: () => void;
  onCollect: () => void;
  onChangeSubjectInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

const ComposePopup = ({
  composeClassName,
  subject,
  viewType,
  debounceSubject,
  fromMail,
  composePopupStyle,
  setViewType,
  onChangeSubjectInput,
  onClose,
  onCollect,
  onClear,
}: ComposePopupProps) => {
  const [isVisibleToolbar, setIsVisibleToolbar] = useState<boolean>(false);
  const [isShowSelectTimeModal, setIsShowSelectTimeModal] = useState<boolean>(false);
  const [isShowOptionMore, setIsShowOptionMore] = useState<boolean>(false);
  const [content, setContent] = useState<string>('');

  const { t } = useTranslation();

  const handleClickDeleteFooter = () => {
    // eslint-disable-next-line no-console
    console.log('this is click delete');
    if (onClear) {
      onClear();
    }
  };

  useEffect(() => {
    const toolbar = document.querySelector<HTMLElement>('.ck.ck-toolbar');
    if (toolbar) {
      if (!isVisibleToolbar) {
        toolbar.style.visibility = 'hidden';
        return;
      }
      toolbar.style.visibility = 'visible';
    }
  }, [isVisibleToolbar]);

  const handleClickMore = () => {
    setIsShowOptionMore((prev) => !prev);
  };

  const handleClickFormat = () => {
    setIsVisibleToolbar((prev) => !prev);
  };

  const handleClickSend = () => {
    // eslint-disable-next-line no-console
    console.log('this is Send');
  };

  const handleClickArrow = () => {
    // eslint-disable-next-line no-console
    console.log('this is Arrow');
  };

  const handleClickSendWihTime = () => {
    // eslint-disable-next-line no-console
    console.log('this is SendWithTime');
    setIsShowSelectTimeModal(true);
  };

  const handleSubmitSchedule = () => {
    // eslint-disable-next-line no-console
    console.log('this is SubmitSchudule');
  };

  const handleChangeViewType = () => {
    if (viewType === ComposeViewTypeEnum.POPUP) {
      setViewType(ComposeViewTypeEnum.MODAL);
      return;
    }
    setViewType(ComposeViewTypeEnum.POPUP);
  };

  const handleChangeEditor = (value: string) => {
    setContent(value);
  };

  useEffect(() => {
    const delayVisibleToolbar = setTimeout(() => {
      if (viewType === ComposeViewTypeEnum.MODAL) {
        setIsVisibleToolbar(true);
      }
    }, 100);
    return () => clearTimeout(delayVisibleToolbar);
  }, [viewType]);

  const handleFormat = () => {
    setContent(striptags(content));
  };

  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log('click');
  };

  return (
    <div
      className={twMerge(
        'fixed bottom-0 right-8 z-50 h-[610px] w-[540px] rounded-t-md bg-white shadow-compose',
        composePopupStyle?.containerClassName,
        viewType === ComposeViewTypeEnum.MODAL && 'rounded-md',
        composeClassName,
      )}
    >
      {(viewType === ComposeViewTypeEnum.REPLY || viewType === ComposeViewTypeEnum.FORWARD) && (
        <ReplyAndForwardHeader
          setViewType={setViewType}
          type={viewType}
          toEmail={fromMail?.from_user?.email}
        />
      )}
      {(viewType === ComposeViewTypeEnum.MODAL || viewType === ComposeViewTypeEnum.POPUP) && (
        <ComposePopupHeader
          title={!_.isEmpty(fromMail) ? `${t('reply')}: ${debounceSubject}` : debounceSubject}
          onClose={() => {
            onClose();
            if (onClear) {
              onClear();
            }
          }}
          onCollect={onCollect}
          onChangeViewType={handleChangeViewType}
        />
      )}
      <div
        className={twMerge(
          'h-full w-full overflow-auto',
          viewType === ComposeViewTypeEnum.POPUP && 'h-[550px]',
          viewType === ComposeViewTypeEnum.REPLY && 'h-[400px]',
          viewType === ComposeViewTypeEnum.FORWARD && 'h-[400px]',
        )}
      >
        <div className="mt-0.5 px-2">
          <ComposePopupRecipient />
          <ComposePopupInput placeholder={t('subject')} value={subject} onChange={onChangeSubjectInput} />
        </div>
        <div
          className={twMerge(
            'mx-2 h-[450px] overflow-auto',
            viewType === ComposeViewTypeEnum.MODAL && 'h-[73vh]',
            composePopupStyle?.composeClassName,
          )}
        >
          <WriterCompose
            data={content}
            handleChangeEditor={handleChangeEditor}
            handleChangeBlur={undefined}
            isLoading={undefined}
            isDisabled={undefined}
          />
        </div>
        <div
          className={twMerge(
            'fixed bottom-3 flex w-[540px] items-center justify-between px-4 ',
            viewType === ComposeViewTypeEnum.MODAL && 'w-[80vw]',
            (viewType === ComposeViewTypeEnum.REPLY || viewType === ComposeViewTypeEnum.FORWARD) &&
              'relative bottom-0 w-full',
          )}
        >
          <div className="flex justify-start gap-4">
            <ComposePopupButtonSend
              onClickSend={handleClickSend}
              onClickArrow={handleClickArrow}
              onClickSendWithTime={handleClickSendWihTime}
            />
            <div className="flex w-full items-center justify-start">
              <ComposePopupToolbarItem
                id="format"
                isActive={isVisibleToolbar}
                title={t('format_options')}
                icon={<CgFormatColor size={20} />}
                onClick={handleClickFormat}
              />
              <ComposePopupToolbarItem
                title={t('attach_files')}
                icon={<IoMdAttach size={19} />}
                onClick={handleClickFormat}
              />
              <ComposePopupToolbarItem
                title={t('insert_link')}
                icon={<FiLink2 size={19} />}
                onClick={handleClickFormat}
              />
              <ComposePopupToolbarItem
                title={t('insert_emotion')}
                icon={<MdTagFaces size={19} />}
                onClick={handleClickFormat}
              />
              <ComposePopupToolbarItem
                title={t('insert_photo')}
                icon={<IoImageOutline size={19} />}
                onClick={handleClickFormat}
              />
              <ComposePopupButtonMore
                content={content}
                onClickFormat={handleFormat}
                onClickTest={handleClick}
                title={t('more')}
                icon={<FiMoreVertical size={19} />}
                onClick={handleClickMore}
                isActive={isShowOptionMore}
                setActive={setIsShowOptionMore}
              />
            </div>
          </div>

          <ComposePopupToolbarItem
            onClick={handleClickDeleteFooter}
            title={t('discard_draft')}
            icon={<FaRegTrashAlt size={14} />}
          />
        </div>
      </div>

      <ComposePopupSelectTimeModal
        isOpen={isShowSelectTimeModal}
        setOpen={setIsShowSelectTimeModal}
        onSubmit={handleSubmitSchedule}
      />
    </div>
  );
};

export default ComposePopup;
