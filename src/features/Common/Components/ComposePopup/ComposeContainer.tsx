import _ from 'lodash';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { MultiValue } from 'react-select';
import { twMerge } from 'tailwind-merge';
import { DraftActionEnum, useDraftsDispatch } from '../../../../app/Context/DraftContext';
import { ComposeViewTypeEnum } from '../../../../app/Enums/commonEnums';
import { ComposePopupStyleType, ComposeType, MailType } from '../../../../app/Types/commonTypes';
import Modal from '../Modal/Modal';
import ComposePopup from './Components/ComposePopup';
import ComposePopupHeader from './Components/ComposePopupHeader';
import { OptionLabel } from './Components/ComposePopupRecipient/ComposePopupSelectRecipients';

interface ComposePopupContainerProps {
  contentInbox?: string;
  compose?: ComposeType;
  isShowComposeReplyOrForward?: boolean;
  fromMail?: MailType;
  onClear?: () => void;
  composePopupStyle?: ComposePopupStyleType;
  composeClassName?: string;
  composeViewType?: ComposeViewTypeEnum;
  setComposeViewType?: Dispatch<SetStateAction<ComposeViewTypeEnum>>;
  id?: string;
}

const ComposePopupContainer = ({
  contentInbox,
  setComposeViewType,
  composeViewType,
  compose,
  isShowComposeReplyOrForward,
  fromMail,
  onClear,
  composePopupStyle,
  composeClassName,
  id,
}: ComposePopupContainerProps) => {
  const [subject, setSubject] = useState<string>('');
  const [debounceSubject, setDebounceSubject] = useState<string>('');
  const [selectedRecipient, setSelectedRecipient] = useState<readonly OptionLabel[] | undefined>([]);
  const [selectedCcRecipient, setSelectedCcRecipient] = useState<readonly OptionLabel[] | undefined>([]);
  const [selectedBccRecipient, setSelectedBccRecipient] = useState<readonly OptionLabel[] | undefined>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<any>(
    composeViewType === ComposeViewTypeEnum.FORWARD ? contentInbox : ' ',
  );

  const dispatch = useDraftsDispatch();

  const handleOnChangeRecipient = (selectedOptions: MultiValue<OptionLabel>) =>
    setSelectedRecipient(selectedOptions);

  const handleOnChangeCcRecipient = (selectedOptions: MultiValue<OptionLabel>) =>
    setSelectedCcRecipient(selectedOptions);

  const handleOnChangeBccRecipient = (selectedOptions: MultiValue<OptionLabel>) =>
    setSelectedBccRecipient(selectedOptions);

  const handleChangeEditor = (value: string) => {
    if (content) {
      return;
    }
    setContent(value);
  };

  const debounceInput = useCallback(
    _.debounce((_searchVal: string) => {
      setDebounceSubject(_searchVal);
    }, 1000),
    [],
  );

  const onChangeSubjectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
    debounceInput(e.target.value);
  };

  const handleClickZoom = () => {
    if (compose?.viewType !== ComposeViewTypeEnum.ZOOM_OUT) {
      dispatch({
        type: DraftActionEnum.CHANGE_VIEW,
        uuid: compose?.uuid,
        viewType: ComposeViewTypeEnum.ZOOM_OUT,
        content,
        recipientBcc: selectedBccRecipient,
        recipient: selectedRecipient,
        recipientCc: selectedCcRecipient,
        subject,
      });
      return;
    }
    dispatch({
      type: DraftActionEnum.CHANGE_VIEW,
      uuid: compose?.uuid,
      viewType: ComposeViewTypeEnum.POPUP,
      content,
      recipientBcc: selectedBccRecipient,
      recipient: selectedRecipient,
      recipientCc: selectedCcRecipient,
      subject,
    });
  };

  const handleChangeViewTypeToModal = () => {
    dispatch({
      type: DraftActionEnum.CHANGE_VIEW,
      uuid: compose?.uuid,
      viewType: ComposeViewTypeEnum.MODAL,
      content,
      recipientBcc: selectedBccRecipient,
      recipient: selectedRecipient,
      recipientCc: selectedCcRecipient,
      subject,
    });
  };

  const handleCloseModalOutside = () => {
    dispatch({
      type: DraftActionEnum.CHANGE_VIEW,
      uuid: compose?.uuid,
      viewType: ComposeViewTypeEnum.POPUP,
    });
  };

  const handleClosePopupZoomIn = () => {
    dispatch({
      type: DraftActionEnum.DELETE,
      uuid: compose?.uuid,
      viewType: ComposeViewTypeEnum.POPUP,
      content,
      recipientBcc: selectedBccRecipient,
      recipient: selectedRecipient,
      recipientCc: selectedCcRecipient,
      subject,
    });
  };

  useEffect(() => {
    if (compose) {
      setSelectedBccRecipient(compose?.recipientBcc);
      setSelectedCcRecipient(compose?.recipientCc);
      setSelectedRecipient(compose?.recipient);
      setDebounceSubject(compose.subject || '');
      setContent(compose.content || ' ');
      setSubject(compose.subject || '');
    }
  }, [compose]);

  useEffect(() => {
    if (!_.isEmpty(fromMail)) {
      setSubject(fromMail.subject);
      setDebounceSubject(fromMail.subject);
    }
  }, [fromMail]);

  const handleClickInsertContent = (contentText: string) => {
    setContent(contentText);
  };

  useEffect(() => {
    if (composeViewType === ComposeViewTypeEnum.FORWARD) {
      setContent(contentInbox);
    }
  }, [composeViewType]);

  return (
    <>
      {isShowComposeReplyOrForward &&
        (composeViewType === ComposeViewTypeEnum.REPLY ||
          composeViewType === ComposeViewTypeEnum.FORWARD) && (
          <ComposePopup
            id={id}
            contentInbox={contentInbox}
            handleClickInsertContent={handleClickInsertContent}
            content={content}
            onChangeEditor={handleChangeEditor}
            selectRecipient={selectedRecipient || undefined}
            selectedCcRecipient={selectedCcRecipient || undefined}
            selectedBccRecipient={selectedBccRecipient || undefined}
            onChangeSelectRecipient={handleOnChangeRecipient}
            onChangeSelectCcRecipient={handleOnChangeCcRecipient}
            onChangeSelectBccRecipient={handleOnChangeBccRecipient}
            onChangeSubjectInput={onChangeSubjectInput}
            debounceSubject={debounceSubject}
            subject={subject}
            onZoom={handleClickZoom}
            viewType={composeViewType}
            fromMail={fromMail}
            onClear={onClear}
            composePopupStyle={composePopupStyle}
            setComposeViewType={setComposeViewType}
            composeClassName={composeClassName || ''}
          />
        )}
      {compose && compose.viewType === ComposeViewTypeEnum.POPUP && (
        <ComposePopup
          id={id}
          content={content}
          onChangeEditor={handleChangeEditor}
          selectRecipient={selectedRecipient || undefined}
          selectedCcRecipient={selectedCcRecipient || undefined}
          selectedBccRecipient={selectedBccRecipient || undefined}
          onChangeSelectRecipient={handleOnChangeRecipient}
          onChangeSelectCcRecipient={handleOnChangeCcRecipient}
          onChangeSelectBccRecipient={handleOnChangeBccRecipient}
          onChangeSubjectInput={onChangeSubjectInput}
          debounceSubject={debounceSubject}
          subject={subject}
          onZoom={handleClickZoom}
          viewType={compose.viewType}
          fromMail={fromMail}
          onClear={onClear}
          composePopupStyle={composePopupStyle}
          composeClassName={composeClassName || ''}
        />
      )}
      {compose && compose.viewType === ComposeViewTypeEnum.MODAL && (
        <Modal
          isShowFooter={false}
          isShowHeader={false}
          onClose={handleCloseModalOutside}
          isOpen={compose.viewType === ComposeViewTypeEnum.MODAL}
          contentContainerClassName="w-[80vw] h-[90vh] bg-white p-0 rounded-lg"
        >
          <ComposePopup
            id={id}
            content={content}
            onChangeEditor={handleChangeEditor}
            selectRecipient={selectedRecipient}
            selectedCcRecipient={selectedCcRecipient}
            selectedBccRecipient={selectedBccRecipient}
            onChangeSelectRecipient={handleOnChangeRecipient}
            onChangeSelectCcRecipient={handleOnChangeCcRecipient}
            onChangeSelectBccRecipient={handleOnChangeBccRecipient}
            onChangeSubjectInput={onChangeSubjectInput}
            debounceSubject={debounceSubject}
            subject={subject}
            onZoom={handleClickZoom}
            onClear={onClear}
            viewType={compose.viewType}
            composePopupStyle={{
              containerClassName: 'absolute left-0 top-0 w-full h-full',
              composeClassName: '',
            }}
          />
        </Modal>
      )}
      {compose && compose.viewType === ComposeViewTypeEnum.ZOOM_OUT && (
        <div className={twMerge('z-50 h-fit min-w-[280px] rounded-t-md bg-white shadow-compose')}>
          <ComposePopupHeader
            className=" bg-[#F2F6FC]"
            onChangeViewType={handleChangeViewTypeToModal}
            title={debounceSubject}
            onClose={handleClosePopupZoomIn}
            onZoom={handleClickZoom}
          />
        </div>
      )}
    </>
  );
};

export default ComposePopupContainer;
