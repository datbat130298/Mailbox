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
  handleClickStatusRead?: () => void;
  type: TypeChat;
  setIsRead: Dispatch<SetStateAction<boolean>>;
  isRead: boolean;
}

const MailItemStatus = ({ data, handleClickStatusRead, type, setIsRead, isRead }: MailItemStatusProp) => {
  const { t } = useTranslation();

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
      <Tooltip position="right" title={t('mark_as_unread')}>
        <div className="" role="button" tabIndex={0} onClick={handleClickStatusRead}>
          <LuMailOpen size={20} className=" ml-3 text-gray-300" />
        </div>
      </Tooltip>
    );
  }
  return (
    <Tooltip position="right" title={t('mark_as_read')}>
      <div className="" role="button" tabIndex={0} onClick={handleClickStatusRead}>
        <IoMailOutline size={21} className=" ml-3 text-blue-700" />
      </div>
    </Tooltip>
  );
};

export default MailItemStatus;
