import _ from 'lodash';
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgFormatColor } from 'react-icons/cg';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiLink2, FiMoreVertical } from 'react-icons/fi';
import { IoMdAttach } from 'react-icons/io';
import { IoImageOutline } from 'react-icons/io5';
import { MdOutlineContentCopy, MdTagFaces } from 'react-icons/md';
import { MultiValue } from 'react-select';
// eslint-disable-next-line import/no-extraneous-dependencies
import striptags from 'striptags';
import { twMerge } from 'tailwind-merge';
import ContextDraft from '../../../../../app/Context/Context';
import { ComposeViewTypeEnum } from '../../../../../app/Enums/commonEnums';
import { ComposePopupStyleType, MailType } from '../../../../../app/Types/commonTypes';
import ComposePopupButtonMore from './ComposePopupButtonMore/ComposePopupButtonMore';
import ComposePopupButtonSend from './ComposePopupButtonSend';
import ComposePopupHeader from './ComposePopupHeader';
import ComposePopupInput from './ComposePopupInput';
import ComposePopupRecipient from './ComposePopupRecipient/ComposePopupRecipient';
import { OptionLabel } from './ComposePopupRecipient/ComposePopupSelectRecipients';
import ComposePopupSelectTimeModal from './ComposePopupSelectTimeModal';
import ComposePopupToolbarItem from './ComposePopupToolbarItem';
import WriterCompose from './EditorWriterCompose';
import ReplyAndForwardHeader from './ReplyAndForwardHeader';

export interface ComposePopupProps {
  content: string;
  onChangeEditor: (value: string) => void;
  selectRecipient: readonly OptionLabel[] | undefined;
  selectedCcRecipient: readonly OptionLabel[] | undefined;
  selectedBccRecipient: readonly OptionLabel[] | undefined;
  onChangeSelectRecipient: (selected: MultiValue<OptionLabel>) => void;
  onChangeSelectCcRecipient: (selected: MultiValue<OptionLabel>) => void;
  onChangeSelectBccRecipient: (selected: MultiValue<OptionLabel>) => void;
  composeClassName?: string;
  viewType?: string;
  subject: string;
  debounceSubject: string;
  fromMail?: MailType;
  composePopupStyle?: ComposePopupStyleType;
  id?: number;
  onClose: () => void;
  onCollect: () => void;
  onChangeSubjectInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  setComposeViewType?: Dispatch<SetStateAction<ComposeViewTypeEnum>>;
  setIsModal?: Dispatch<SetStateAction<boolean>>;
  contentInbox?: string;
  handleClickInsertContent?: (text: string) => void;
}

const ComposePopup = ({
  handleClickInsertContent,
  setComposeViewType,
  content,
  onChangeEditor,
  selectRecipient,
  selectedCcRecipient,
  selectedBccRecipient,
  onChangeSelectRecipient,
  onChangeSelectCcRecipient,
  onChangeSelectBccRecipient,
  composeClassName,
  subject,
  viewType,
  debounceSubject,
  fromMail,
  composePopupStyle,
  id,
  onChangeSubjectInput,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClose,
  onCollect,
  onClear,
  setIsModal,
  contentInbox,
}: ComposePopupProps) => {
  const [isVisibleToolbar, setIsVisibleToolbar] = useState<boolean>(false);
  const [isShowSelectTimeModal, setIsShowSelectTimeModal] = useState<boolean>(false);
  const [isShowOptionMore, setIsShowOptionMore] = useState<boolean>(false);
  const [isShowButtonInsertContent, setIsShowButtonInsertContent] = useState<boolean>(false);

  const { t } = useTranslation();
  const { handleChangeViewType, handleClickCloseComposeItem } = useContext(ContextDraft);

  const handleClickDeleteFooter = () => {
    // eslint-disable-next-line no-console
    console.log('this is click delete');
    if (onClear) {
      onClear();
    }
  };

  useEffect(() => {
    if (contentInbox) {
      setIsShowButtonInsertContent(true);
    }
  }, [contentInbox]);

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
    console.log('mailbox');
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

  const handleChangeViewTypeCompose = () => {
    if (viewType === ComposeViewTypeEnum.POPUP) {
      setIsModal?.(true);
      handleChangeViewType(id || 0, ComposeViewTypeEnum.MODAL);
      return;
    }
    setIsModal?.(false);
    handleChangeViewType(id || 0, ComposeViewTypeEnum.POPUP);
  };

  const handleClickButtonInsertContent = useCallback(() => {
    if (contentInbox && _.isFunction(handleClickInsertContent)) {
      handleClickInsertContent(contentInbox);
      setIsShowButtonInsertContent(false);
    }
  }, [contentInbox]);

  useEffect(() => {
    const delayVisibleToolbar = setTimeout(() => {
      if (viewType === ComposeViewTypeEnum.MODAL) {
        setIsVisibleToolbar(true);
      }
    }, 100);
    return () => clearTimeout(delayVisibleToolbar);
  }, [viewType]);

  const handleFormat = () => {
    onChangeEditor(striptags(content));
  };

  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log('click');
  };

  const handleClose = () => {
    handleClickCloseComposeItem(id || 0);
    if (_.isFunction(onClear)) {
      onClear();
    }
  };

  return (
    <div
      className={twMerge(
        'z-50 h-[610px] min-w-[540px] rounded-t-md bg-white shadow-compose',
        composePopupStyle?.containerClassName,
        viewType === ComposeViewTypeEnum.MODAL && 'rounded-md',
        composeClassName,
      )}
    >
      {(viewType === ComposeViewTypeEnum.REPLY || viewType === ComposeViewTypeEnum.FORWARD) && (
        <ReplyAndForwardHeader
          setComposeViewType={setComposeViewType}
          type={viewType}
          toEmail={fromMail?.from_user?.email}
        />
      )}
      {(viewType === ComposeViewTypeEnum.MODAL || viewType === ComposeViewTypeEnum.POPUP) && (
        <ComposePopupHeader
          title={!_.isEmpty(fromMail) ? `${t('reply')}: ${debounceSubject}` : debounceSubject}
          onClose={handleClose}
          onCollect={onCollect}
          onChangeViewType={handleChangeViewTypeCompose}
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
          {viewType !== ComposeViewTypeEnum.REPLY && (
            <ComposePopupRecipient
              selectRecipient={selectRecipient}
              selectedCcRecipient={selectedCcRecipient}
              selectedBccRecipient={selectedBccRecipient}
              onChangeSelectRecipient={onChangeSelectRecipient}
              onChangeSelectCcRecipient={onChangeSelectCcRecipient}
              onChangeSelectBccRecipient={onChangeSelectBccRecipient}
            />
          )}
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
            handleChangeEditor={onChangeEditor}
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
              {contentInbox && _.isFunction(handleClickInsertContent) && isShowButtonInsertContent && (
                <ComposePopupToolbarItem
                  title={t('insert_content')}
                  icon={<MdOutlineContentCopy size={17} />}
                  onClick={handleClickButtonInsertContent}
                />
              )}
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
