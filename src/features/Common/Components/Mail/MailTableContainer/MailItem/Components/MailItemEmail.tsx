import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { TypeChat } from '../../../../../../../app/Enums/commonEnums';
import { MailType } from '../../../../../../../app/Types/commonTypes';
import useSelector from '../../../../../../Hooks/useSelector';

interface MailItemEmailProp {
  mail: MailType;
  type: TypeChat;
  isReadMail: boolean;
}

const MailItemEmail = ({ mail, type, isReadMail }: MailItemEmailProp) => {
  const { itemMailStyle } = useSelector((state) => state.layout);

  const emailShow = useMemo(() => {
    if (type === TypeChat.DRAFT) {
      return 'Draft';
    }
    if (type === TypeChat.INBOX) {
      return mail.email_address;
    }
    if ((type === TypeChat.SENT || type === TypeChat.SCHEDULE) && mail?.sents_email_address) {
      return `To: ${mail?.sents_email_address[0]?.email_address}`;
    }
    return mail.email_addresses;
  }, [mail]);

  return (
    <div
      className={twMerge(
        'my-auto h-fit w-40 overflow-hidden text-ellipsis whitespace-nowrap text-left font-semibold text-gray-900 md:flex-shrink-0',
        itemMailStyle === 'classic' && 'my-0 w-full flex-1 text-left',
        isReadMail && 'font-normal',
        type === TypeChat.DRAFT && 'font-semibold text-primary-500',
      )}
    >
      {emailShow}
    </div>
  );
};
export default MailItemEmail;
