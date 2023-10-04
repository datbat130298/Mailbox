import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import _ from 'lodash';
import { nanoid } from 'nanoid';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiRightArrowCircle } from 'react-icons/bi';
import { BsChatLeftText } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import { IoSearchOutline } from 'react-icons/io5';
import { MdOutlineScheduleSend } from 'react-icons/md';
import { PiFlagPennantFill } from 'react-icons/pi';
import { twMerge } from 'tailwind-merge';
import { DraftActionEnum, useDraftsDispatch } from '../../../../../../app/Context/DraftContext';
import { ComposeViewTypeEnum, StatusSent, TypeChat } from '../../../../../../app/Enums/commonEnums';
import { readEmailById } from '../../../../../../app/Services/ConversationService/ConversationService';
import { MailType } from '../../../../../../app/Types/commonTypes';
import useNotify from '../../../../../Hooks/useNotify';
import useSelector from '../../../../../Hooks/useSelector';
import ComposePopupContainer from '../../../ComposePopup/ComposeContainer';
import LoadingHeader from '../../../Loading/LoadingHeader';
import ViewMailSpaceGroupButtonFooter from '../ViewMailSpace/ViewMailSpaceGroupButtonFooter';
import ViewMailAttachment from './ViewMailAttachment/ViewMailAttachments';
import ViewMailSpaceItemInfoCollapse from './ViewMailSpaceItemInfoCollapse';

interface ViewMailSpaceItemProp {
  mail: MailType;
  isActive: boolean;
  isArray?: boolean;
  handleSelectMail?: (mail: MailType) => void;
  type: string;
  selectedMail: MailType;
  onClose: () => void;
  onDeleteEmail?: (id: Array<number>) => void;
  onRemoveItem?: (id: number) => void;
}

const ViewMailSpaceItem = ({
  mail,
  isActive,
  isArray,
  handleSelectMail,
  selectedMail,
  type,
  onClose,
  onDeleteEmail,
  onRemoveItem,
}: ViewMailSpaceItemProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowComposeWrite, setIsShowComposeWrite] = useState(false);
  const [viewType, setViewType] = useState<ComposeViewTypeEnum>();
  const [isLoading, setIsLoading] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const userEmail = useSelector((state) => state.user.email);
  const dateMail = dayjs();
  const dateCurrent = dayjs(mail?.created_at);
  const toast = useNotify();
  const emailUser = useSelector((state) => state.user.email);
  const dispatch = useDraftsDispatch();
  dayjs.extend(utc);
  const contentDefaultForward = `<br><br><p>---------- Forwarded message -------- <br> From: ${mail?.email_account?.email_address} <br>Date: ${mail?.created_at}<br>Subject: ${mail?.subject}<br>To: ${emailUser}</p>`;
  const contentForward = `${contentDefaultForward} <br><br> ${mail?.body}`;
  const { t } = useTranslation();

  const receiver = useMemo(() => {
    const emailReci = [];
    if (mail?.sents_email_address && !_.isEmpty(mail.sents_email_address)) {
      const emailArr = mail.sents_email_address.map((item) => item.email_address);
      emailReci.push(emailArr);
    }
    if (mail?.bcc && !_.isEmpty(mail?.bcc)) {
      const emailArr = mail?.bcc?.map((item) => item.email_address);
      emailReci.push(emailArr);
    }
    if (mail?.cc && !_.isEmpty(mail?.cc)) {
      const emailArr = mail?.cc?.map((item) => item.email_address);
      emailReci?.push(emailArr);
    }
    if (_.isEmpty(emailReci)) {
      return mail?.email_address;
    }
    return emailReci.join(', ');
  }, [mail]);

  const handleClickHeaderMailItem = (mailCurrent: MailType) => {
    setIsShowComposeWrite(false);
    if (!isArray) return;
    setIsOpen((prev) => !prev);
    if (_.isFunction(handleSelectMail)) {
      handleSelectMail(mailCurrent);
    }
  };

  const handleClickForward = () => {
    setViewType(ComposeViewTypeEnum.FORWARD);
    setIsShowComposeWrite(true);
  };

  const handleClickChangeView = () => {
    setIsShowComposeWrite(false);
  };

  useEffect(() => {
    setIsShowComposeWrite(false);
    if (_.isEmpty(mail?.inbox) && !isArray) {
      setIsOpen(true);
    } else if (mail?.id === selectedMail.id) {
      setIsOpen(true);
    }
  }, [mail, selectedMail]);

  const handleClickReply = () => {
    setViewType(ComposeViewTypeEnum.REPLY);
    setIsShowComposeWrite(true);
  };

  const handleClickReplyCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: DraftActionEnum.ADD_COMPOSE,
      uuid: nanoid(),
      viewType: ComposeViewTypeEnum.POPUP,
      recipient: [{ email: mail?.email_address }],
    });
  };

  const handleClickForwardCollapse = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: DraftActionEnum.ADD_COMPOSE,
      uuid: nanoid(),
      viewType: ComposeViewTypeEnum.POPUP,
      body: contentForward,
    });
  };

  const emailAddress = useMemo(() => {
    if (mail?.email_account?.email_address === userEmail) {
      return 'Me';
    }
    return mail?.email_account?.email_address;
  }, [mail]);

  const handleCancelSchedule = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (_.isFunction(onRemoveItem)) {
      onRemoveItem(mail.id);
    }
    if (_.isFunction(onDeleteEmail) && _.isFunction(onRemoveItem)) {
      onDeleteEmail([mail.id]);
      const emailRecipient = mail?.sents_email_address?.map((item) => ({ email: item.email_address }));
      const emailRecipientBcc = mail?.bcc?.map((item) => ({ email: item.email_address }));
      const emailRecipientCc = mail?.cc?.map((item) => ({ email: item.email_address }));
      dispatch({
        type: DraftActionEnum.ADD_COMPOSE,
        uuid: nanoid(),
        viewType: ComposeViewTypeEnum.POPUP,
        body: mail.body,
        subject: mail.subject,
        recipient: emailRecipient,
        recipientBcc: emailRecipientBcc,
        recipientCc: emailRecipientCc,
      });
      onClose();
    }
  };

  useEffect(() => {
    setIsRead(mail?.read || false);
  }, [mail]);

  useEffect(() => {
    if (!_.isEmpty(mail) && !mail.read && !isRead && isOpen) {
      readEmailById([mail.id]).catch(() => toast.error('action_error'));
      setIsRead(true);
    }
  }, [mail, isOpen]);

  return (
    <div
      className={twMerge(
        'mr-4 h-fit flex-col items-center justify-start border-b-[0.5px]',
        isActive && 'border-l-2 border-l-blue-500 bg-white',
        mail.id === selectedMail.id && 'border-l-2 border-l-blue-500 bg-white',
        isOpen && 'bg-white',
        !isOpen && 'group',
      )}
    >
      <div
        className={twMerge('flex h-20 w-full items-center px-3', !isOpen && 'bg-gray-50 hover:bg-white')}
        tabIndex={0}
        role="button"
        onClick={() => handleClickHeaderMailItem(mail || ({} as MailType))}
      >
        <div
          className={twMerge(
            'ml-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-500',
            userEmail === mail?.email_account?.email_address && 'bg-sky-300 italic opacity-40',
          )}
        >
          <p className="text-lg font-semibold uppercase">
            {mail?.email_account?.email_address === userEmail
              ? 'ME'
              : mail?.email_account?.email_address?.slice(0, 1)}
          </p>
        </div>
        {!isOpen && (
          <ViewMailSpaceItemInfoCollapse
            isRead={isRead}
            type={type}
            isArray={isArray}
            mail={mail}
            isActive={isActive}
            isOpen={isOpen}
            onClickReply={handleClickReplyCollapse}
            onClickForward={handleClickForwardCollapse}
          />
        )}
        {isOpen && (
          <div className="ml-4 flex w-full flex-col gap-1">
            <div className="flex w-full justify-between">
              <div className="flex items-center justify-start gap-4">
                <p className="truncate">{emailAddress}</p>
                <div className="flex items-center gap-0.5">
                  <GoDotFill size={10} className="mx-1 mt-0.5 text-gray-300" />
                  <div className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-slate-100 hover:text-black">
                    <BsChatLeftText size={15} className="" />
                  </div>
                  {/* <div className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-slate-100 hover:text-black">
                  <IoCallOutline size={17} className="" />
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-slate-100 hover:text-black">
                  <BsCameraVideo size={18} className="" />
                </div> */}
                  <div className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-slate-100 hover:text-black">
                    <IoSearchOutline size={18} className="" />
                  </div>
                </div>
              </div>
              <div
                className={twMerge(
                  '-mr-1 hidden items-center gap-1.5 rounded-md bg-gray-50 px-3 py-1.5 text-ms font-semibold text-blue-500 hover:bg-gray-100 hover:text-blue-600',
                  type === TypeChat.SCHEDULE && 'flex',
                  mail?.status === StatusSent.SCHEDULE && 'flex',
                )}
                role="button"
                tabIndex={0}
                onClick={handleCancelSchedule}
              >
                {/* <GoDotFill size={10} className="mx-1 mt-0.5 text-gray-300" /> */}
                {t('cancel_send')}
              </div>
            </div>
            <div className="flex items-center justify-start gap-2">
              <div className="rounded-md text-gray-500 hover:bg-slate-100 hover:text-black">
                <PiFlagPennantFill className="-ml-[5px] p-1" size={20} />
              </div>
              <p className="text-xs text-gray-600">
                {dateMail.diff(dateCurrent, 'D')
                  ? dayjs.utc(mail?.created_at).local().format('ddd, MMM D, YYYY h:mm A')
                  : dayjs.utc(mail?.created_at).local().format('h:mm A')}
              </p>
              <p
                className={twMerge(
                  'flex items-center text-xs uppercase text-gray-600',
                  mail?.type === TypeChat.SENT && isArray && 'text-orange-500',
                )}
              >
                <GoDotFill size={10} className="mx-1.5 mt-0.5 text-gray-300" />
                {type}
              </p>
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <>
          <div className="-mt-1 ml-4 flex gap-10 pb-3">
            <div className="flex h-full items-start">
              <BiRightArrowCircle size={17} className="mx-1 mt-0.5 text-gray-600" />
            </div>
            <div className="flex items-start justify-start gap-2">
              <p className="text-sm text-gray-600">{t('to')}:</p>
              <p className="text-left text-sm text-gray-600">{receiver}</p>
            </div>
          </div>
          <div
            className={twMerge(
              '-mt-2 ml-4 hidden items-center justify-between pb-3',
              type === TypeChat.SCHEDULE && 'flex',
              mail?.status === StatusSent.SCHEDULE && 'flex',
            )}
          >
            <div className="flex items-center gap-10">
              <MdOutlineScheduleSend size={17} className="mx-[5px] mt-0.5 text-gray-600" />
              <p className="text-sm text-gray-600">Send scheduled for {dayjs(mail?.schedule_at).format()}</p>
            </div>
          </div>
          <div className="mx-4 break-all border-y py-4 text-left text-base">
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: mail?.body ? mail.body : ' ' }} />
          </div>
          {!_.isEmpty(mail.attachments) && <ViewMailAttachment attachments={mail.attachments} />}
          <ViewMailSpaceGroupButtonFooter
            onClickReply={handleClickReply}
            onClickForward={handleClickForward}
            isShowComposeReplyOrForward={isShowComposeWrite}
          />
          {isShowComposeWrite && (
            <div className="pb-3">
              <ComposePopupContainer
                setIsShowComposeWrite={setIsShowComposeWrite}
                setIsLoading={setIsLoading}
                contentInbox={viewType === ComposeViewTypeEnum.FORWARD ? contentForward : mail?.body}
                handleClickChangeView={handleClickChangeView}
                isShowComposeReplyOrForward={isShowComposeWrite}
                id="forward"
                composeViewType={viewType}
                fromMail={mail || ({} as MailType)}
                composePopupStyle={{
                  containerClassName: 'w-full shadow-none rounded-2xl overflow-hidden h-fit',
                  composeClassName: 'min-h-[300px] h-fit',
                  composeContent: 'overflow-hidden',
                }}
              />
            </div>
          )}
        </>
      )}
      <LoadingHeader isShow={isLoading} />
    </div>
  );
};

export default ViewMailSpaceItem;
