import { EmojiClickData } from 'emoji-picker-react';
import _ from 'lodash';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgFormatColor } from 'react-icons/cg';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiLink2, FiMoreVertical } from 'react-icons/fi';
import { IoMdAttach } from 'react-icons/io';
import { IoImageOutline } from 'react-icons/io5';
import { MdOpenInNew, MdOutlineContentCopy } from 'react-icons/md';
// eslint-disable-next-line import/no-extraneous-dependencies
import striptags from 'striptags';
import { twMerge } from 'tailwind-merge';
import { DraftActionEnum, useDraftsDispatch } from '../../../../../app/Context/DraftContext';
import { ComposeViewTypeEnum } from '../../../../../app/Enums/commonEnums';
import { ComposePopupStyleType, MailType } from '../../../../../app/Types/commonTypes';
import { EmailType } from '../../SelectMultiEmail/SelectMultiEmail';
import Tooltip from '../../Tooltip/Tooltip';
import AttachmentsModal, { FileLoadedType } from './Attachments/AttachmentsModal';
import ComposePopupButtonMore from './ComposePopupButtonMore/ComposePopupButtonMore';
import ComposePopupButtonSend from './ComposePopupButtonSend';
import ComposePopupHeader from './ComposePopupHeader';
import ComposePopupInput from './ComposePopupInput';
import ComposePopupRecipient from './ComposePopupRecipient/ComposePopupRecipient';
import ComposePopupToolbarItem from './ComposePopupToolbarItem';
import WriterCompose from './EditorWriterCompose';
import ComposeButtonFooterEmotionPicker from './Emoji/ComposeButtonFooterEmojiPicker';
import ComposePopupSelectTimeModal from './PickTimeAndDate/ComposePopupSelectTimeModal';

export interface ComposePopupProps {
  body: string;
  onChangeEditor: (value: string) => void;
  selectRecipient: Array<EmailType>;
  selectedCcRecipient: Array<EmailType>;
  selectedBccRecipient: Array<EmailType>;
  onChangeSelectRecipient: (selected: Array<EmailType>) => void;
  onChangeSelectCcRecipient: (selected: Array<EmailType>) => void;
  onChangeSelectBccRecipient: (selected: Array<EmailType>) => void;
  composeClassName?: string;
  viewType?: string;
  subject: string;
  debounceSubject: string;
  fromMail?: MailType;
  composePopupStyle?: ComposePopupStyleType;
  id?: string;
  onClose?: (isSave?: boolean) => void;
  onZoom: (e: React.MouseEvent) => void;
  onChangeSubjectInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  setComposeViewType?: Dispatch<SetStateAction<ComposeViewTypeEnum>>;
  contentInbox?: string;
  handleClickInsertContent?: (text: string) => void;
  handleClickChangeView?: () => void;
  isShowToolbar?: boolean;
  onClickSend: (date?: string) => void;
  onChangeAttachment: (arr: FileLoadedType[]) => void;
  attachments: FileLoadedType[];
  isLoading: boolean;
  onInsertEmoji: (emoji: EmojiClickData) => void;
}

const ComposePopup = ({
  attachments,
  onChangeAttachment,
  handleClickChangeView,
  handleClickInsertContent,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setComposeViewType,
  body,
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
  onClose,
  onZoom,
  onClear,
  contentInbox,
  isShowToolbar = false,
  onClickSend,
  isLoading,
  onInsertEmoji,
}: ComposePopupProps) => {
  const [isVisibleToolbar, setIsVisibleToolbar] = useState<boolean>(false);
  const [isShowSelectTimeModal, setIsShowSelectTimeModal] = useState<boolean>(false);
  const [isShowOptionMore, setIsShowOptionMore] = useState<boolean>(false);
  const [isShowButtonInsertContent, setIsShowButtonInsertContent] = useState<boolean>(false);
  const [isShowAttachmentModal, setIsShowAttachmentModal] = useState(false);

  const { t } = useTranslation();

  const dispatch = useDraftsDispatch();

  useEffect(() => {
    if (contentInbox && viewType === ComposeViewTypeEnum.REPLY) {
      setIsShowButtonInsertContent(true);
      return;
    }
    setIsShowButtonInsertContent(false);
  }, [contentInbox, viewType]);

  const handleClickDeleteFooter = () => {
    if (_.isFunction(onClose)) onClose();
    if (_.isFunction(handleClickChangeView)) handleClickChangeView();
    if (onClear) {
      onClear();
    }
  };

  const handleClickMore = () => {
    setIsShowOptionMore((prev) => !prev);
  };

  const handleClickFormat = () => {
    setIsVisibleToolbar((prev) => !prev);
  };

  const handleClickSend = () => {
    onClickSend();
  };

  const handleClickSendWihTime = () => {
    setIsShowSelectTimeModal(true);
  };

  const handleSubmitSchedule = (date: string) => {
    onClickSend(date);
  };

  const handleClickImportFile = () => {
    setIsShowAttachmentModal(true);
  };

  const handleCloseAttachmentModal = () => {
    setIsShowAttachmentModal(false);
  };

  const handleChangeViewTypeCompose = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewType === ComposeViewTypeEnum.POPUP) {
      dispatch({
        type: DraftActionEnum.CHANGE_VIEW,
        uuid: id,
        viewType: ComposeViewTypeEnum.MODAL,
        body,
        recipientBcc: selectedBccRecipient,
        recipient: selectRecipient,
        recipientCc: selectedCcRecipient,
        subject,
      });
      return;
    }
    dispatch({
      type: DraftActionEnum.CHANGE_VIEW,
      uuid: id,
      viewType: ComposeViewTypeEnum.POPUP,
      body,
      recipientBcc: selectedBccRecipient,
      recipient: selectRecipient,
      recipientCc: selectedCcRecipient,
      subject,
    });
  };

  const handleClickButtonInsertContent = useCallback(() => {
    if (contentInbox && _.isFunction(handleClickInsertContent)) {
      handleClickInsertContent(contentInbox);
      setIsShowButtonInsertContent(false);
    }
  }, [contentInbox]);

  useEffect(() => {
    const compose = document.getElementById(`${id}`);
    const toolbar = compose?.querySelector<HTMLDivElement>('.ck.ck-toolbar');
    if (toolbar) {
      if (!isVisibleToolbar) {
        toolbar.style.visibility = 'hidden';
        return;
      }
      toolbar.style.visibility = 'visible';
      toolbar.style.position = 'absolute';
      toolbar.style.bottom = '23px';
    }
  }, [isVisibleToolbar]);

  useEffect(() => {
    if (window.screen.width > 620) {
      const delayVisibleToolbar = setTimeout(() => {
        if (viewType === ComposeViewTypeEnum.MODAL) {
          setIsVisibleToolbar(true);
        }
      }, 100);
      return () => clearTimeout(delayVisibleToolbar);
    }
    return undefined;
  }, [viewType]);

  const handleFormat = () => {
    onChangeEditor(striptags(body));
  };

  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log('click');
  };

  const handleClose = () => {
    // handleClickCloseComposeItem(id || 0);
    if (_.isFunction(onClose)) onClose();
    dispatch({ type: DraftActionEnum.DELETE, viewType: ComposeViewTypeEnum.POPUP, uuid: id });
    if (_.isFunction(onClear)) {
      onClear();
    }
  };

  const handleClickChangeViewTypeToPopup = () => {
    dispatch({
      type: DraftActionEnum.ADD_COMPOSE,
      viewType: ComposeViewTypeEnum.POPUP,
      body,
      recipientBcc: selectedBccRecipient,
      recipient: selectRecipient,
      recipientCc: selectedCcRecipient,
      subject,
    });
    if (_.isFunction(handleClickChangeView)) handleClickChangeView();
  };

  return (
    <div
      className={twMerge(
        'relative z-50  flex h-[680px] w-[620px] flex-shrink-0 flex-col overflow-auto rounded-t-md bg-white shadow-compose',
        composePopupStyle?.containerClassName,
        viewType === ComposeViewTypeEnum.MODAL && 'rounded-md',
        composeClassName,
      )}
    >
      {(viewType === ComposeViewTypeEnum.MODAL || viewType === ComposeViewTypeEnum.POPUP) && (
        <ComposePopupHeader
          title={!_.isEmpty(fromMail) ? `${t('reply')}: ${debounceSubject}` : debounceSubject}
          onClose={handleClose}
          onZoom={(e: React.MouseEvent) => onZoom(e)}
          onChangeViewType={(e: React.MouseEvent) => handleChangeViewTypeCompose(e)}
        />
      )}
      <div
        className={twMerge(
          'flex h-full w-full flex-1 flex-col overflow-auto',
          viewType === ComposeViewTypeEnum.POPUP && 'h-fit',
          composePopupStyle?.composeContent,
        )}
      >
        <div className="mt-0.5 px-2">
          <ComposePopupRecipient
            viewType={viewType}
            selectRecipient={selectRecipient}
            selectedCcRecipient={selectedCcRecipient}
            selectedBccRecipient={selectedBccRecipient}
            onChangeSelectRecipient={onChangeSelectRecipient}
            onChangeSelectCcRecipient={onChangeSelectCcRecipient}
            onChangeSelectBccRecipient={onChangeSelectBccRecipient}
          />

          <ComposePopupInput
            viewType={viewType}
            placeholder={t('subject')}
            value={subject}
            onChange={onChangeSubjectInput}
          />
        </div>
        <div
          className={twMerge(
            'relative mx-2 h-[80%] overflow-auto',
            viewType === ComposeViewTypeEnum.MODAL && 'h-[73vh]',
            composePopupStyle?.composeClassName,
          )}
        >
          <WriterCompose
            isShowToolbar={isShowToolbar}
            id={id}
            data={body}
            handleChangeEditor={onChangeEditor}
            handleChangeBlur={undefined}
            isLoading={undefined}
            isDisabled={undefined}
          />
        </div>
        <div
          className={twMerge(
            'absolute bottom-3 flex w-full items-center justify-between bg-transparent px-4',
            viewType === ComposeViewTypeEnum.MODAL && 'w-[80vw]',
            (viewType === ComposeViewTypeEnum.REPLY || viewType === ComposeViewTypeEnum.FORWARD) &&
              'relative bottom-3 w-full',
          )}
        >
          <div className="relative flex justify-start gap-4">
            <ComposePopupButtonSend
              isLoading={isLoading}
              onClickSend={handleClickSend}
              onClickSendWithTime={handleClickSendWihTime}
            />
            <div className="hidden w-full items-center justify-start sm:flex">
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
                onClick={handleClickImportFile}
              />
              <ComposePopupToolbarItem
                title={t('insert_link')}
                icon={<FiLink2 size={19} />}
                onClick={handleClickFormat}
              />
              <ComposeButtonFooterEmotionPicker onInsertEmoji={onInsertEmoji} />
              <ComposePopupToolbarItem
                title={t('insert_photo')}
                icon={<IoImageOutline size={19} />}
                onClick={handleClickImportFile}
              />
              {contentInbox && _.isFunction(handleClickInsertContent) && isShowButtonInsertContent && (
                <ComposePopupToolbarItem
                  title={t('insert_content')}
                  icon={<MdOutlineContentCopy size={17} />}
                  onClick={handleClickButtonInsertContent}
                />
              )}
              <ComposePopupButtonMore
                content={body}
                onClickFormat={handleFormat}
                onClickTest={handleClick}
                title={t('more')}
                icon={<FiMoreVertical size={19} />}
                onClick={handleClickMore}
                isActive={isShowOptionMore}
                setActive={setIsShowOptionMore}
              />
            </div>
            <div
              className={twMerge(
                'absolute -left-2 bottom-20 hidden w-full bg-slate-200 bg-opacity-50 px-2 py-1 text-sm font-semibold text-black',
                !_.isEmpty(attachments) && 'block',
                !isVisibleToolbar && 'bottom-10',
              )}
            >
              <div className="flex w-full items-center justify-between">
                {`${attachments.length} ${t('attachment')}(s)`}
                <div
                  className="px-2 py-0.5 font-medium text-blue-400 hover:shadow-md"
                  tabIndex={0}
                  onClick={handleClickImportFile}
                  role="button"
                >
                  {t('show')}
                </div>
              </div>
            </div>
          </div>
          <div className=" flex items-center justify-center">
            {(viewType === ComposeViewTypeEnum.REPLY || viewType === ComposeViewTypeEnum.FORWARD) && (
              <Tooltip title={t('open_in_a_popup')} position="top">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={handleClickChangeViewTypeToPopup}
                  className="-mr-2 mt-2.5 flex h-8 w-fit items-center justify-center rounded-md px-2 hover:bg-gray-100 hover:text-black"
                >
                  <div className="flex-center h-full w-max">
                    <MdOpenInNew size={17} />
                  </div>
                </div>
              </Tooltip>
            )}

            <ComposePopupToolbarItem
              onClick={handleClickDeleteFooter}
              title={t('discard_draft')}
              icon={<FaRegTrashAlt size={14} />}
            />
          </div>
        </div>
      </div>

      <ComposePopupSelectTimeModal
        isOpen={isShowSelectTimeModal}
        setOpen={setIsShowSelectTimeModal}
        onSubmit={handleSubmitSchedule}
      />
      <AttachmentsModal
        attachments={attachments}
        isOpen={isShowAttachmentModal}
        onClose={handleCloseAttachmentModal}
        onChangeAttachment={onChangeAttachment}
      />
    </div>
  );
};

export default React.memo(ComposePopup);
