import dayjs from 'dayjs';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiRightArrowCircle } from 'react-icons/bi';
import { GoDotFill } from 'react-icons/go';
import { PiFlagPennantFill } from 'react-icons/pi';
import { twMerge } from 'tailwind-merge';
import { TypeChat } from '../../../../../../app/Enums/commonEnums';
import { MailType } from '../../../../../../app/Types/commonTypes';
import useSelector from '../../../../../Hooks/useSelector';
import { convertHtmlToString } from '../../../../../utils/helpers';
import ViewMailSpaceButtonFooterItem from '../ViewMailSpace/ViewMailSpaceButtonFooterItem';

interface ViewMailSpaceItemMobileProp {
  mail: MailType;
  onClickForward: () => void;
  onClickReply: () => void;
  onClickReplyAll: () => void;
  isActive: boolean;
  handleSelectMail: (mail: MailType) => void;
  isArray?: boolean;
  type: TypeChat | string;
  selectedEmail: MailType;
}

const ViewMailSpaceItemMobile = ({
  type,
  mail,
  onClickForward,
  onClickReply,
  onClickReplyAll,
  isActive,
  handleSelectMail,
  isArray,
  selectedEmail,
}: ViewMailSpaceItemMobileProp) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const userEmail = useSelector((state) => state.user.email);
  const dateMail = dayjs();
  const dateCurrent = dayjs(mail?.created_at);

  const subjectRe = useMemo(() => {
    if (mail?.subject) {
      return mail.subject;
    }
    return '(No Subject)';
  }, [mail]);

  const handleClickHeaderMailItem = (mailCurrent: MailType) => {
    // setIsShowComposeWrite(false);
    if (!isArray) return;
    setIsOpen((prev) => !prev);
    if (_.isFunction(handleSelectMail)) {
      handleSelectMail(mailCurrent);
    }
  };

  const receiver = useMemo(() => {
    if (type !== TypeChat.SENT) {
      return mail?.email_address;
    }
    if (mail.sents_email_address !== undefined && !_.isEmpty(mail.sents_email_address)) {
      const emailArr = mail.sents_email_address.map((item) => item.email_address);
      return emailArr.join(', ');
    }
    return undefined;
  }, [mail]);

  useEffect(() => {
    if (_.isEmpty(mail?.inbox) && !isArray) {
      setIsOpen(true);
    }
  }, [mail]);

  return (
    <div
      className={twMerge(
        'h-fit flex-col items-center justify-start border-b-[0.5px]',
        isActive && 'border-l-2 border-l-blue-500 bg-white',
        mail.id === selectedEmail.id && 'border-l-2 border-l-blue-500 bg-white',
        isOpen && 'bg-white',
        !isOpen && 'group',
      )}
    >
      <div
        className={twMerge('flex h-20 w-full items-center px-3', !isOpen && 'bg-gray-50')}
        tabIndex={0}
        role="button"
        onClick={() => handleClickHeaderMailItem(mail || ({} as MailType))}
      >
        {/* Avatar */}
        <div
          className={twMerge(
            'ml-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-500',
            userEmail === mail?.email_account?.email_address && 'bg-sky-300 italic opacity-60',
          )}
        >
          <p className="text-lg font-semibold uppercase">
            {userEmail === mail?.email_account?.email_address
              ? 'ME'
              : mail?.author?.slice(0, 1) || mail?.email_account?.email_address?.slice(0, 1)}
          </p>
        </div>
        {/* Avatar */}
        {!isOpen && (
          <div
            className={twMerge(
              'ml-4 flex h-12 w-full flex-col gap-1 ',
              type === TypeChat.SENT && 'italic',
              userEmail === mail?.email_account?.email_address && 'italic',
            )}
          >
            <div className={twMerge('flex flex-row items-center')}>
              <div className="flex items-center justify-start gap-1.5">
                <p className="max-w-[33%] truncate text-base font-normal text-black">
                  {userEmail === mail?.email_account?.email_address
                    ? 'Me'
                    : mail?.email_account?.email_address}
                </p>
                <div className="rounded-md text-gray-500 hover:bg-slate-100 hover:text-black">
                  <PiFlagPennantFill className="p-1" size={20} />
                </div>
                <div className="flex items-center justify-center">
                  <p className="text-ellipsis text-xs text-gray-600">
                    {dateMail.diff(dateCurrent, 'D')
                      ? dayjs(mail?.created_at).format('ddd, MMM D, h:mm A')
                      : dayjs(mail?.created_at).format('h:mm A')}
                  </p>
                  <p
                    className={twMerge(
                      'flex items-center  text-xs uppercase text-gray-600',
                      mail?.type === TypeChat.SENT && isArray && 'text-orange-500',
                    )}
                  >
                    <GoDotFill size={10} className={twMerge('mx-1 mt-0.5 uppercase text-gray-400')} />
                    {mail?.type}
                  </p>
                </div>
              </div>
            </div>
            <div
              className={twMerge(
                'line-clamp-1 flex w-full justify-start',
                userEmail === mail?.email_account?.email_address && 'italic',
              )}
            >
              <p className="line-clamp-1 w-fit text-ellipsis text-left text-sm">{`Re: ${subjectRe}`}</p>
              <p className={twMerge('line-clamp-1 flex w-full text-ellipsis text-sm text-gray-600')}>
                {!_.isEmpty(mail?.body) && `- ${convertHtmlToString(mail?.body)}`}
              </p>
            </div>
          </div>
        )}
        {isOpen && (
          <div className="ml-4 flex flex-col gap-1">
            <div className="flex items-center justify-start ">
              <p
                className={twMerge('truncate', userEmail === mail?.email_account?.email_address && 'italic')}
              >
                {userEmail === mail?.email_account?.email_address ? 'Me' : mail?.email_account?.email_address}
              </p>
            </div>
            <div className="flex items-center justify-start gap-2">
              <div className="rounded-md text-gray-500 hover:bg-slate-100 hover:text-black">
                <PiFlagPennantFill className="-ml-[5px] p-1" size={20} />
              </div>
              <p className="text-xs text-gray-600">
                {dateMail.diff(dateCurrent, 'D')
                  ? dayjs(mail?.created_at).format('ddd, MMM D, YYYY h:mm A')
                  : dayjs(mail?.created_at).format('h:mm A')}
              </p>
              <p
                className={twMerge(
                  'flex items-center text-xs uppercase text-gray-600',
                  mail?.type === TypeChat.SENT && isArray && 'text-orange-500',
                )}
              >
                <GoDotFill size={10} className="mx-1.5 mt-0.5 text-gray-300" />
                {mail?.status}
              </p>
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <div className="flex w-full flex-col">
          <div className="-mt-2 ml-4 flex items-center gap-10 pb-3">
            <BiRightArrowCircle size={17} className="mx-1 mt-0.5 text-gray-600" />
            <div className="item-center flex gap-2">
              <p className="text-sm text-gray-500">To:</p>
              <p className="text-sm text-gray-500">{receiver}</p>
            </div>
          </div>
          <div className=" bg-white px-3">
            {/*  content mail */}
            <div className="px-2 text-justify text-sm">
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: mail ? mail.body : ' ' }} />
            </div>
          </div>
          {/* {!_.isEmpty(fakeDataAttachment) && <ViewMailAttachmentMobile attachments={fakeDataAttachment} />} */}
          <div className={twMerge('mx-5 flex h-12 items-center justify-start text-blue-600')}>
            <ViewMailSpaceButtonFooterItem
              onClick={() => onClickReply()}
              className="-ml-2"
              title={t('reply')}
            />
            <ViewMailSpaceButtonFooterItem onClick={() => onClickReplyAll()} title={t('reply_all')} />
            <ViewMailSpaceButtonFooterItem onClick={() => onClickForward()} title={t('forward')} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewMailSpaceItemMobile;
