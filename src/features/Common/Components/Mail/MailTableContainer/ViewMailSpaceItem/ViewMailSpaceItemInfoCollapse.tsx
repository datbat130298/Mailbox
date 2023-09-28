import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import _ from 'lodash';
import { useMemo } from 'react';
import { GoDotFill } from 'react-icons/go';
import { PiFlagPennantFill } from 'react-icons/pi';
import { twMerge } from 'tailwind-merge';
import { TypeChat } from '../../../../../../app/Enums/commonEnums';
import { MailType } from '../../../../../../app/Types/commonTypes';
import useSelector from '../../../../../Hooks/useSelector';
import { convertHtmlToString } from '../../../../../utils/helpers';
import ViewMailSpaceItemRowAction from './ViewMailSpaceItemRowAction';

interface ViewMailSpaceItemInfoCollapseProp {
  mail: MailType | null;
  isArray: boolean | undefined;
  isActive: boolean;
  isOpen: boolean;
  onClickReply: (e: React.MouseEvent) => void;
  onClickForward: (e: React.MouseEvent) => void;
  type: string;
  isRead: boolean;
}

const ViewMailSpaceItemInfoCollapse = ({
  onClickReply,
  onClickForward,
  mail,
  isArray,
  isActive,
  isOpen,
  type,
  isRead,
}: ViewMailSpaceItemInfoCollapseProp) => {
  dayjs.extend(utc);

  const dateMail = dayjs();
  const dateCurrent = dayjs(mail?.created_at);

  const subjectRe = useMemo(() => {
    if (mail?.subject) {
      return mail.subject;
    }
    return '(No Subject)';
  }, [mail]);

  const emailUser = useSelector((state) => state.user.email);

  return (
    <div className={twMerge('ml-4 flex h-12 w-full flex-col gap-1 ', type === TypeChat.SENT && 'italic')}>
      <div className={twMerge('flex flex-row items-center justify-between')}>
        <div className="flex items-center justify-start gap-1.5">
          <p
            className={twMerge(
              'max-w-[50%] truncate text-base font-normal not-italic text-black',
              !isRead && 'font-semibold',
            )}
          >
            {emailUser === mail?.email_account?.email_address ? 'Me' : mail?.email_account?.email_address}
          </p>
          <div className="rounded-md text-gray-500 hover:bg-slate-100 hover:text-black">
            <PiFlagPennantFill className="p-1" size={20} />
          </div>
          <div className="flex items-center justify-center">
            <p className="line-clamp-1 text-ellipsis text-xs text-gray-600">
              {dateMail.diff(dateCurrent, 'D')
                ? dayjs.utc(mail?.created_at).local().format('ddd, MMM D, h:mm A')
                : dayjs(mail?.created_at).format('h:mm A')}
            </p>
            <p
              className={twMerge(
                'flex items-center  text-xs uppercase text-gray-600',
                mail?.type === TypeChat.SENT && isArray && 'text-orange-500',
              )}
            >
              <GoDotFill size={10} className={twMerge('mx-1 mt-0.5 uppercase text-gray-400')} />
              {type}
            </p>
          </div>
        </div>
        <ViewMailSpaceItemRowAction
          isActive={isActive}
          isOpen={isOpen}
          onClickReply={onClickReply}
          onClickForward={onClickForward}
        />
      </div>
      <div
        className={twMerge('line-clamp-1 flex w-full justify-start', emailUser === mail?.address && 'italic')}
      >
        <p
          className={twMerge(
            'line-clamp-1 w-fit text-ellipsis text-left text-sm',
            !isRead && 'font-semibold',
          )}
        >{`Re: ${subjectRe}`}</p>
        <p className={twMerge('line-clamp-1 flex w-full text-ellipsis text-sm text-gray-600')}>
          {!_.isEmpty(mail?.body) && `- ${convertHtmlToString(mail?.body)}`}
        </p>
      </div>
    </div>
  );
};

export default ViewMailSpaceItemInfoCollapse;
