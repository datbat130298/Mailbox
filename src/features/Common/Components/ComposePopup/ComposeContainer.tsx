import _ from 'lodash';
import { nanoid } from 'nanoid';
import React, { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { DraftActionEnum, useDraftsDispatch } from '../../../../app/Context/DraftContext';
import { ComposeViewTypeEnum } from '../../../../app/Enums/commonEnums';
import { sendEmail } from '../../../../app/Services/Sent/SentService';
import { ComposePopupStyleType, ComposeType, MailType } from '../../../../app/Types/commonTypes';
import useNotify from '../../../Hooks/useNotify';
import ErrorModal from '../ErrorModal/ErrorModal';
import Modal from '../Modal/Modal';
import { EmailType } from '../SelectMultiEmail/SelectMultiEmail';
import { FileLoadedType } from './Components/Attachments/AttachmentsModal';
import ComposePopup from './Components/ComposePopup';
import ComposePopupHeader from './Components/ComposePopupHeader';

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
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setIsShowComposeWrite?: Dispatch<SetStateAction<boolean>>;
  id?: string;
  handleClickChangeView?: () => void;
}

const ComposePopupContainer = ({
  handleClickChangeView,
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
  setIsLoading,
  setIsShowComposeWrite,
}: ComposePopupContainerProps) => {
  const [subject, setSubject] = useState<string>('');
  const [debounceSubject, setDebounceSubject] = useState<string>('');
  const [selectedRecipient, setSelectedRecipient] = useState<Array<EmailType>>([]);
  const [selectedCcRecipient, setSelectedCcRecipient] = useState<Array<EmailType>>([]);
  const [selectedBccRecipient, setSelectedBccRecipient] = useState<Array<EmailType>>([]);
  // const [body, setBody] = useState<any>(composeViewType === ComposeViewTypeEnum.FORWARD ? contentInbox : ' ');
  const [body, setBody] = useState<string>('');
  const [isShowErrorModal, setIsShowErrorModal] = useState(false);
  const [attachments, setAttachments] = useState<FileLoadedType[]>([]);
  const [isLoadingSend, setIsLoadingSend] = useState(false);
  const toast = useNotify();
  const { t } = useTranslation();

  const dispatch = useDraftsDispatch();

  const handleChangeAttachment = (arr: FileLoadedType[]) => {
    setAttachments(arr);
  };

  const handleOnChangeRecipient = (selectedOptions: Array<EmailType>) => {
    setSelectedRecipient(selectedOptions);
  };

  const handleOnChangeCcRecipient = (selectedOptions: Array<EmailType>) =>
    setSelectedCcRecipient(selectedOptions);

  const handleOnChangeBccRecipient = (selectedOptions: Array<EmailType>) =>
    setSelectedBccRecipient(selectedOptions);

  const handleChangeEditor = useCallback((value: string) => {
    // if (body) {
    //   return;
    // }
    setBody(value);
  }, []);

  const handleClose = (isSave?: boolean) => {
    dispatch({ type: DraftActionEnum.DELETE, viewType: ComposeViewTypeEnum.POPUP, uuid: id });
    if (_.isFunction(onClear)) {
      onClear();
    }
    if (!isSave) {
      if (
        !_.isEmpty(selectedRecipient) ||
        !_.isEmpty(selectedBccRecipient) ||
        !_.isEmpty(selectedCcRecipient) ||
        !_.isEmpty(body)
      ) {
        const attachmentArrayString = attachments.map((item) => item.absolute_slug);
        const recipient = selectedRecipient.map((item) => item.email);
        const recipientBcc = selectedBccRecipient.map((item) => item.email);
        const recipientCc = selectedCcRecipient.map((item) => item.email);
        const dataSubmit = {
          email_address: [...recipient],
          cc: [...recipientCc],
          bcc: [...recipientBcc],
          files: attachmentArrayString,
          body,
          type: 'DRAFT',
          subject: _.isEmpty(subject) ? 'No Subject' : subject,
        };
        sendEmail(dataSubmit)
          .then(() => {
            toast.success(t('save_draft'));
          })
          .catch((err) => {
            if (_.isEmpty(err)) {
              toast.error(t('save_draft_error'));
            }
          });
      }
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCloseSend = () => {
    dispatch({ type: DraftActionEnum.DELETE, viewType: ComposeViewTypeEnum.POPUP, uuid: id });
    if (_.isFunction(onClear)) {
      onClear();
    }
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

  const handleClickZoom = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (compose?.viewType !== ComposeViewTypeEnum.ZOOM_OUT) {
      dispatch({
        type: DraftActionEnum.CHANGE_VIEW,
        uuid: compose?.uuid,
        viewType: ComposeViewTypeEnum.ZOOM_OUT,
        body,
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
      body,
      recipientBcc: selectedBccRecipient,
      recipient: selectedRecipient,
      recipientCc: selectedCcRecipient,
      subject,
    });
  };

  const isAllowSend = useMemo(() => {
    if (!_.isEmpty(selectedRecipient) || !_.isEmpty(selectedBccRecipient) || !_.isEmpty(selectedCcRecipient))
      return true;
    return false;
  }, [selectedRecipient, selectedBccRecipient, selectedCcRecipient]);

  const handleClickSend = () => {
    setIsLoadingSend(true);
    setIsLoading(true);
    if (!isAllowSend) {
      setIsShowErrorModal(true);
      setIsLoading(false);
      setIsLoadingSend(false);
      return;
    }
    const attachmentArrayString = attachments.map((item) => item.absolute_slug);
    const recipient = selectedRecipient.map((item) => item.email);
    const recipientBcc = selectedBccRecipient.map((item) => item.email);
    const recipientCc = selectedCcRecipient.map((item) => item.email);

    const dataSubmit = {
      email_address: [...recipient],
      cc: [...recipientCc],
      bcc: [...recipientBcc],
      files: attachmentArrayString,
      body,
      type: 'PROCESSING',
      subject,
    };
    sendEmail(dataSubmit)
      .then(() => {
        toast.success(t('sent_success'));
        if (_.isFunction(setIsShowComposeWrite)) setIsShowComposeWrite(false);
        handleCloseSend();
      })
      .catch((err) => {
        if (!_.isEmpty(err)) {
          toast.error(t('sent_error'));
        }
      })
      .finally(() => {
        setIsLoading(false);
        setIsLoadingSend(false);
      });
  };

  const handleChangeViewTypeToModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: DraftActionEnum.CHANGE_VIEW,
      uuid: compose?.uuid,
      viewType: ComposeViewTypeEnum.MODAL,
      body,
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
      body,
      recipientBcc: selectedBccRecipient,
      recipient: selectedRecipient,
      recipientCc: selectedCcRecipient,
      subject,
    });
  };

  useEffect(() => {
    if (compose) {
      setSelectedBccRecipient(compose.recipientBcc || []);
      setSelectedCcRecipient(compose.recipientCc || []);
      setSelectedRecipient(compose.recipient || []);
      setDebounceSubject(compose.subject || '');
      setBody(compose.body || ' ');
      setSubject(compose.subject || '');
    }
  }, [compose]);

  useEffect(() => {
    if (!_.isEmpty(fromMail)) {
      if (composeViewType === ComposeViewTypeEnum.REPLY) {
        setSelectedRecipient([
          { id: nanoid(), email: fromMail?.email_account?.email_address || fromMail.email_address || '' },
        ]);
      }
      setSubject(fromMail.subject);
      setDebounceSubject(fromMail.subject);
    }
  }, [fromMail, composeViewType]);

  const handleClickInsertContent = (contentText: string) => {
    setBody(contentText);
  };

  useEffect(() => {
    if (composeViewType === ComposeViewTypeEnum.FORWARD) {
      setBody(contentInbox || '');
    }
  }, [composeViewType]);

  return (
    <>
      {isShowComposeReplyOrForward &&
        (composeViewType === ComposeViewTypeEnum.REPLY ||
          composeViewType === ComposeViewTypeEnum.FORWARD) && (
          <ComposePopup
            isLoading={isLoadingSend}
            attachments={attachments}
            onChangeAttachment={handleChangeAttachment}
            onClickSend={handleClickSend}
            handleClickChangeView={handleClickChangeView}
            id={id}
            contentInbox={contentInbox}
            handleClickInsertContent={handleClickInsertContent}
            body={body}
            onClose={handleClose}
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
            onZoom={(e: React.MouseEvent) => handleClickZoom(e)}
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
          isLoading={isLoadingSend}
          attachments={attachments}
          onChangeAttachment={handleChangeAttachment}
          onClickSend={handleClickSend}
          id={id}
          onClose={handleClose}
          body={body}
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
          onZoom={(e: React.MouseEvent) => handleClickZoom(e)}
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
            isLoading={isLoadingSend}
            attachments={attachments}
            onChangeAttachment={handleChangeAttachment}
            onClickSend={handleClickSend}
            id={id}
            body={body}
            onChangeEditor={handleChangeEditor}
            selectRecipient={selectedRecipient}
            onClose={handleClose}
            selectedCcRecipient={selectedCcRecipient}
            selectedBccRecipient={selectedBccRecipient}
            onChangeSelectRecipient={handleOnChangeRecipient}
            onChangeSelectCcRecipient={handleOnChangeCcRecipient}
            onChangeSelectBccRecipient={handleOnChangeBccRecipient}
            onChangeSubjectInput={onChangeSubjectInput}
            debounceSubject={debounceSubject}
            subject={subject}
            onZoom={(e: React.MouseEvent) => handleClickZoom(e)}
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
            onChangeViewType={(e: React.MouseEvent) => handleChangeViewTypeToModal(e)}
            title={debounceSubject}
            onClose={handleClosePopupZoomIn}
            onZoom={(e: React.MouseEvent) => handleClickZoom(e)}
          />
        </div>
      )}
      <ErrorModal isOpen={isShowErrorModal} onClose={() => setIsShowErrorModal(false)} />
    </>
  );
};

export default React.memo(ComposePopupContainer);
