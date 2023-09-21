import _ from 'lodash';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMailOutline } from 'react-icons/io5';
import { LuMailCheck, LuMailOpen } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';
import { StatusSent, TypeChat } from '../../../../app/Enums/commonEnums';
import { MailType } from '../../../../app/Types/commonTypes';
import Tooltip from '../Tooltip/Tooltip';

interface MailItemStatusProp {
  data: MailType;
  unReadEmail?: (ids: Array<number>) => void;
  type: TypeChat;
  setIsRead: Dispatch<SetStateAction<boolean>>;
  isRead: boolean;
}

const MailItemStatus = ({ data, unReadEmail, type, setIsRead, isRead }: MailItemStatusProp) => {
  const { t } = useTranslation();

  const handleClickUnread = () => {
    if (_.isFunction(unReadEmail)) {
      setIsRead(false);
      unReadEmail([data.id]);
    }
  };

  useEffect(() => {
    if (type === TypeChat.INBOX && !_.isEmpty(data) && data.read !== undefined) {
      setIsRead(data.read);
    }
  }, [data]);

  if ('sent_email_address' in data) {
    return (
      <Tooltip position="right" title={data?.status === StatusSent.DONE ? t('delivered') : t('in_progress')}>
        <LuMailCheck
          size={19}
          className={twMerge('ml-3 text-gray-500', data?.status === StatusSent.DONE && 'text-blue-500')}
        />
      </Tooltip>
    );
  }
  if (type === TypeChat.INBOX && isRead) {
    return (
      <div className="" role="button" tabIndex={0} onClick={handleClickUnread}>
        <LuMailOpen size={20} className=" ml-3 text-gray-300" />
      </div>
    );
  }
  return <IoMailOutline size={21} className=" ml-3 text-blue-700" />;
};

export default MailItemStatus;
