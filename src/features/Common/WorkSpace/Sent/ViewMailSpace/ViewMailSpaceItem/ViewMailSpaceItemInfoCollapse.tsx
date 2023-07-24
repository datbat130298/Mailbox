import dayjs from 'dayjs';
import _ from 'lodash';
import { useMemo } from 'react';
import { GoDotFill } from 'react-icons/go';
import { twMerge } from 'tailwind-merge';
import { MailType } from '../../../../../../app/Types/commonTypes';
import useSelector from '../../../../../Hooks/useSelector';

interface ViewMailSpaceItemInfoCollapseProp {
  mail: MailType | null;
}

const ViewMailSpaceItemInfoCollapse = ({ mail }: ViewMailSpaceItemInfoCollapseProp) => {
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
    <div className="mx-2 flex h-12 w-full flex-col gap-1">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <p className="text-base font-normal text-black">{mail?.author}</p>
          <p className="text-xs text-gray-600">
            {!dateMail.diff(dateCurrent, 'D')
              ? dayjs(mail?.time).format('ddd, MMM D, YYYY h:mm A')
              : dayjs(mail?.time).format('h:mm A')}
          </p>
          <p className="flex items-center  text-xs uppercase text-gray-600">
            {' '}
            <GoDotFill size={10} className="mx-1.5 mt-0.5 text-gray-400" /> SENT
          </p>
        </div>
      </div>
      <div className={twMerge('line-clamp-1 flex justify-start', emailUser === mail?.address && 'italic')}>
        <div className="">
          <p className="line-clamp-1 w-fit text-ellipsis text-left text-sm">{`Re: ${subjectRe}`}</p>
        </div>
        <div className={twMerge('line-clamp-1 flex w-fit text-ellipsis text-sm text-gray-600')}>
          {!_.isEmpty(mail?.content) && `- ${mail?.content}`}
        </div>
      </div>
    </div>
  );
};

export default ViewMailSpaceItemInfoCollapse;
