import dayjs from 'dayjs';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { TypeChat } from '../../../../../../../app/Enums/commonEnums';
import { MailType } from '../../../../../../../app/Types/commonTypes';

interface MailItemDateProp {
  date: string;
  isReadMail: boolean;
  type: TypeChat;
  mail: MailType;
}

const MailItemDate = ({ date, type, mail, isReadMail }: MailItemDateProp) => {
  const showDate = useMemo(() => {
    if (type === TypeChat.SCHEDULE && mail?.schedule_at) {
      return mail.schedule_at;
    }
    return date;
  }, [type]);
  return (
    <div
      className={twMerge(
        'my-auto line-clamp-1 h-fit w-20 shrink-0 text-right text-xs text-gray-600 md:w-32',
        !isReadMail && 'font-semibold text-gray-700',
        type === TypeChat.SCHEDULE && 'text-sm font-semibold text-yellow-900',
      )}
    >
      <div className="hidden md:block">
        {window.innerWidth < 1280 && window.innerWidth >= 1024
          ? dayjs.utc(showDate).local().format('MMM D, h:mm')
          : dayjs.utc(showDate).local().format('ddd, MMM D, h:mm A')}
      </div>
      <div
        className={twMerge(
          'line-clamp-1 flex h-1/2 w-full items-center justify-end text-ellipsis break-all text-center font-normal leading-6 text-gray-500 md:hidden',
          !isReadMail && ' font-semibold text-gray-800',
          type === TypeChat.SCHEDULE && 'text-sm font-semibold text-yellow-900',
        )}
      >
        {dayjs.utc(showDate).local().format('MMM D')}
      </div>
      <p
        className={twMerge(
          'flex h-1/2 items-center justify-end leading-6 text-gray-500 md:hidden lg:h-0',
          !isReadMail && ' text-gray-800',
        )}
      >
        40kb
      </p>
    </div>
  );
};

export default MailItemDate;
