import dayjs from 'dayjs';
import _ from 'lodash';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { BsCameraVideo, BsChatLeftText } from 'react-icons/bs';
import { GoDotFill } from 'react-icons/go';
import { IoCallOutline, IoSearchOutline } from 'react-icons/io5';
import { PiFlagPennantFill } from 'react-icons/pi';
import { twMerge } from 'tailwind-merge';
import { DraftActionEnum, useDraftsDispatch } from '../../../../../../app/Context/DraftContext';
import { ComposeViewTypeEnum, TypeChat } from '../../../../../../app/Enums/commonEnums';
import { MailType } from '../../../../../../app/Types/commonTypes';
import useSelector from '../../../../../Hooks/useSelector';
import ComposePopupContainer from '../../../ComposePopup/ComposeContainer';
import ViewMailSpaceGroupButtonFooter from '../ViewMailSpace/ViewMailSpaceGroupButtonFooter';
import ViewMailSpaceItemInfoCollapse from './ViewMailSpaceItemInfoCollapse';

interface ViewMailSpaceItemProp {
  mail: MailType;
  isActive: boolean;
  isArray?: boolean;
  handleSelectMail?: (mail: MailType) => void;
  isFirstOpen?: boolean;
}

const ViewMailSpaceItem = ({
  mail,
  isActive,
  isArray,
  handleSelectMail,
  isFirstOpen,
}: ViewMailSpaceItemProp) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShowComposeWrite, setIsShowComposeWrite] = useState(false);
  const [viewType, setViewType] = useState<ComposeViewTypeEnum>();

  const userEmail = useSelector((state) => state.user.email);
  const dateMail = dayjs();
  const dateCurrent = dayjs(mail?.created_at);
  const emailUser = useSelector((state) => state.user.email);
  const dispatch = useDraftsDispatch();

  const contentDefaultForward = `<br><br><p>---------- Forwarded message -------- <br> From: ${mail?.from_user?.email} <br>Date: ${mail?.created_at}<br>Subject: ${mail?.subject}<br>To: ${emailUser}</p>`;
  const contentForward = `${contentDefaultForward} <br><br> ${mail?.body}`;

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
    } else if (isFirstOpen) {
      setIsOpen(true);
    }
  }, [mail]);

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
      recipient: [{ email: mail.address }],
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

  return (
    <div
      className={twMerge(
        'mr-4 h-fit flex-col items-center justify-start border-b-[0.5px]',
        isActive && 'border-l-2 border-l-blue-500 bg-white',
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
            userEmail === mail?.from_user?.email && 'bg-sky-300 italic opacity-40',
          )}
        >
          <p className="text-lg font-semibold">
            {userEmail === mail?.from_user?.email ? 'ME' : mail?.author.slice(0, 1)}
          </p>
        </div>
        {!isOpen && (
          <ViewMailSpaceItemInfoCollapse
            isArray={isArray}
            mail={mail}
            isActive={isActive}
            isOpen={isOpen}
            onClickReply={handleClickReplyCollapse}
            onClickForward={handleClickForwardCollapse}
          />
        )}
        {isOpen && (
          <div className="ml-4 flex flex-col gap-1">
            <div className="flex items-center justify-start gap-4">
              <p className="max-w-[150px] truncate">
                {userEmail === mail?.from_user?.email ? 'Me' : mail?.author}
              </p>
              <div className="flex items-center gap-0.5">
                <GoDotFill size={10} className="mx-1 mt-0.5 text-gray-300" />
                <div className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-slate-100 hover:text-black">
                  <BsChatLeftText size={15} className="" />
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-slate-100 hover:text-black">
                  <IoCallOutline size={17} className="" />
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-slate-100 hover:text-black">
                  <BsCameraVideo size={18} className="" />
                </div>
                <div className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 hover:bg-slate-100 hover:text-black">
                  <IoSearchOutline size={18} className="" />
                </div>
              </div>
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
                {mail?.type}
              </p>
            </div>
          </div>
        )}
      </div>
      {isOpen && (
        <>
          <div className="mx-4 break-all border-y-[0.5px] py-4 text-left text-base">
            {/* eslint-disable-next-line react/no-danger */}
            <div dangerouslySetInnerHTML={{ __html: mail?.body ? mail.body : ' ' }} />
          </div>
          <ViewMailSpaceGroupButtonFooter
            onClickReply={handleClickReply}
            onClickForward={handleClickForward}
            isShowComposeReplyOrForward={isShowComposeWrite}
          />
          {isShowComposeWrite && (
            <div className="pb-3">
              <ComposePopupContainer
                contentInbox={viewType === ComposeViewTypeEnum.FORWARD ? contentForward : mail?.body}
                handleClickChangeView={handleClickChangeView}
                isShowComposeReplyOrForward={isShowComposeWrite}
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
    </div>
  );
};

export default ViewMailSpaceItem;
