import dayjs from 'dayjs';
import _ from 'lodash';
import { useMemo } from 'react';
import { GoDotFill } from 'react-icons/go';
import { twMerge } from 'tailwind-merge';
import { TypeChat } from '../../../../../../app/Enums/commonEnums';
import { MailType } from '../../../../../../app/Types/commonTypes';
import useSelector from '../../../../../Hooks/useSelector';
import { convertHtmlToString } from '../../../../../utils/helpers';

interface ViewMailSpaceItemInfoCollapseProp {
  mail: MailType | null;
  isArray: boolean | undefined;
}

const ViewMailSpaceItemInfoCollapse = ({ mail, isArray }: ViewMailSpaceItemInfoCollapseProp) => {
  const dateMail = dayjs();
  const dateCurrent = dayjs(mail?.time);

  const subjectRe = useMemo(() => {
    if (mail?.subject) {
      return mail.subject;
    }
    return '(No Subject)';
  }, [mail]);

  const emailUser = useSelector((state) => state.user.email);

  return (
    <div
      className={twMerge('mx-4 flex h-12 w-full flex-col gap-1', mail?.type === TypeChat.SENT && 'italic')}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <p className="text-base font-normal not-italic text-black">
            {emailUser === mail?.from_user?.email ? 'Me' : mail?.author}
          </p>
          <p className="text-xs text-gray-600">
            {!dateMail.diff(dateCurrent, 'D')
              ? dayjs(mail?.time).format('ddd, MMM D, YYYY h:mm A')
              : dayjs(mail?.time).format('h:mm A')}
          </p>
          <p
            className={twMerge(
              'flex items-center  text-xs uppercase text-gray-600',
              mail?.type === TypeChat.SENT && isArray && 'text-orange-500',
            )}
          >
            <GoDotFill size={10} className={twMerge('mx-1.5 mt-0.5 uppercase text-gray-400')} />
            {mail?.type}
          </p>
        </div>
      </div>
      <div
        className={twMerge('line-clamp-1 flex w-full justify-start', emailUser === mail?.address && 'italic')}
      >
        <p className="line-clamp-1 w-fit text-ellipsis text-left text-sm">{`Re: ${subjectRe}`}</p>
        <p className={twMerge('line-clamp-1 flex w-full text-ellipsis text-sm text-gray-600')}>
          {!_.isEmpty(mail?.content) && `- ${convertHtmlToString(mail?.content)}`}
        </p>
      </div>
    </div>
  );
};

export default ViewMailSpaceItemInfoCollapse;
