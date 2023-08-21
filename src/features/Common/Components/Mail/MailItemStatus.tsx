import { useTranslation } from 'react-i18next';
import { IoMailOutline } from 'react-icons/io5';
import { LuMailCheck, LuMailOpen } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';
import { StatusSent } from '../../../../app/Enums/commonEnums';
import { MailType } from '../../../../app/Types/commonTypes';
import Tooltip from '../Tooltip/Tooltip';

interface MailItemStatusProp {
  data: MailType;
}

const MailItemStatus = ({ data }: MailItemStatusProp) => {
  const { t } = useTranslation();
  const isRead = data?.read;

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
  if (isRead) {
    return <LuMailOpen size={20} className=" ml-3 text-gray-300" />;
  }
  return <IoMailOutline size={21} className=" ml-3 text-blue-700" />;
};

export default MailItemStatus;
