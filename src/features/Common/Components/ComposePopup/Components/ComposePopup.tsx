import _ from 'lodash';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgFormatColor } from 'react-icons/cg';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiLink2, FiMoreVertical } from 'react-icons/fi';
import { IoMdAttach } from 'react-icons/io';
import { IoImageOutline } from 'react-icons/io5';
import { MdTagFaces } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import { ComposeViewTypeEnum } from '../../../../../app/Enums/commonEnums';
import { ComposePopupStyleType, MailType } from '../../../../../app/Types/commonTypes';
import ComposePopupButtonSend from './ComposePopupButtonSend';
import ComposePopupHeader from './ComposePopupHeader';
import ComposePopupInput from './ComposePopupInput';
import ComposePopupSelectTimeModal from './ComposePopupSelectTimeModal';
import ComposePopupToolbarItem from './ComposePopupToolbarItem';
import WriterCompose from './EditorWriterCompose';
import ReplyAndForwardHeader from './ReplyAndForwardHeader';

export interface ComposePopupProps {
  composeClassName?: string;
  viewType?: string;
  subject: string;
  receiver: string;
  debounceSubject: string;
  fromMail?: MailType;
  composePopupStyle?: ComposePopupStyleType;
  setViewType: Dispatch<SetStateAction<ComposeViewTypeEnum>>;
  onClose: () => void;
  onCollect: () => void;
  onChangeSubjectInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeReceiverInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

const ComposePopup = ({
  composeClassName,
  subject,
  receiver,
  viewType,
  debounceSubject,
  fromMail,
  composePopupStyle,
  setViewType,
  onChangeSubjectInput,
  onChangeReceiverInput,
  onClose,
  onCollect,
  onClear,
}: ComposePopupProps) => {
  const [isVisibleToolbar, setIsVisibleToolbar] = useState<boolean>(false);
  const [isShowSelectTimeModal, setIsShowSelectTimeModal] = useState<boolean>(false);

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

  useEffect(() => {
    const delayVisibleToolbar = setTimeout(() => {
      if (viewType === ComposeViewTypeEnum.MODAL) {
        setIsVisibleToolbar(true);
      }
    }, 100);
    return () => clearTimeout(delayVisibleToolbar);
  }, [viewType]);

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
        <>
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
          <div className="mt-0.5 px-2">
            <ComposePopupInput label={t('recipients')} value={receiver} onChange={onChangeReceiverInput} />
            <ComposePopupInput label={t('subject')} value={subject} onChange={onChangeSubjectInput} />
          </div>
        </>
      )}
      <div
        className={twMerge(
          'mx-2 h-[428px]',
          viewType === ComposeViewTypeEnum.MODAL && 'h-[71vh]',
          composePopupStyle?.composeClassName,
        )}
      >
        <WriterCompose
          data={undefined}
          handleChangeEditor={undefined}
          handleChangeBlur={undefined}
          isLoading={undefined}
          isDisabled={undefined}
        />
      </div>
      <div className={twMerge('relative flex w-full items-center justify-between px-4')}>
        <div className="flex justify-start gap-4">
          <ComposePopupButtonSend
            onClickSend={handleClickSend}
            onClickArrow={handleClickArrow}
            onClickSendWithTime={handleClickSendWihTime}
          />
          <div className="flex w-full items-center  justify-start">
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
            <ComposePopupToolbarItem
              title={t('more')}
              icon={<FiMoreVertical size={19} />}
              onClick={handleClickFormat}
            />
          </div>
        </div>

        <ComposePopupToolbarItem
          onClick={handleClickDeleteFooter}
          title={t('discard_draft')}
          icon={<FaRegTrashAlt size={14} />}
        />
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
