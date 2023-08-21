import _ from 'lodash';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgFormatColor } from 'react-icons/cg';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiLink2, FiMoreVertical } from 'react-icons/fi';
import { IoMdAttach } from 'react-icons/io';
import { IoImageOutline } from 'react-icons/io5';
import { MdOpenInNew, MdOutlineContentCopy, MdTagFaces } from 'react-icons/md';
// eslint-disable-next-line import/no-extraneous-dependencies
import striptags from 'striptags';
import { twMerge } from 'tailwind-merge';
import { DraftActionEnum, useDraftsDispatch } from '../../../../../app/Context/DraftContext';
import { ComposeViewTypeEnum } from '../../../../../app/Enums/commonEnums';
import { ComposePopupStyleType, MailType } from '../../../../../app/Types/commonTypes';
import { EmailType } from '../../SelectMultiEmail/SelectMultiEmail';
import Tooltip from '../../Tooltip/Tooltip';
import ComposePopupButtonMore from './ComposePopupButtonMore/ComposePopupButtonMore';
import ComposePopupButtonSend from './ComposePopupButtonSend';
import ComposePopupHeader from './ComposePopupHeader';
import ComposePopupInput from './ComposePopupInput';
import ComposePopupRecipient from './ComposePopupRecipient/ComposePopupRecipient';
import ComposePopupSelectTimeModal from './ComposePopupSelectTimeModal';
import ComposePopupToolbarItem from './ComposePopupToolbarItem';
import WriterCompose from './EditorWriterCompose';

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
  onClose?: () => void;
  onZoom: (e: React.MouseEvent) => void;
  onChangeSubjectInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  setComposeViewType?: Dispatch<SetStateAction<ComposeViewTypeEnum>>;
  contentInbox?: string;
  handleClickInsertContent?: (text: string) => void;
  handleClickChangeView?: () => void;
  isShowToolbar?: boolean;
}

const ComposePopup = ({
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onClose,
  onZoom,
  onClear,
  contentInbox,
  isShowToolbar = false,
}: ComposePopupProps) => {
  const [isVisibleToolbar, setIsVisibleToolbar] = useState<boolean>(false);
  const [isShowSelectTimeModal, setIsShowSelectTimeModal] = useState<boolean>(false);
  const [isShowOptionMore, setIsShowOptionMore] = useState<boolean>(false);
  const [isShowButtonInsertContent, setIsShowButtonInsertContent] = useState<boolean>(false);

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
        'z-50 h-[610px] w-[540px] flex-shrink-0 rounded-t-md bg-white shadow-compose',
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
          'h-full w-full overflow-auto',
          viewType === ComposeViewTypeEnum.POPUP && 'h-[550px]',
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
            'mx-2 h-[430px] overflow-auto',
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
            'fixed bottom-3 flex w-[540px] items-center justify-between px-4 ',
            viewType === ComposeViewTypeEnum.MODAL && 'w-[80vw]',
            (viewType === ComposeViewTypeEnum.REPLY || viewType === ComposeViewTypeEnum.FORWARD) &&
              'relative bottom-3 w-full',
          )}
        >
          <div className="flex justify-start gap-4">
            <ComposePopupButtonSend
              onClickSend={handleClickSend}
              onClickArrow={handleClickArrow}
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
    </div>
  );
};

export default ComposePopup;
