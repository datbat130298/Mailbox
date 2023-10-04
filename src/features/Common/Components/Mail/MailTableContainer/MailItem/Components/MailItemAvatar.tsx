import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { TypeChat } from '../../../../../../../app/Enums/commonEnums';
import { MailType } from '../../../../../../../app/Types/commonTypes';
import useSelector from '../../../../../../Hooks/useSelector';

interface MailItemAvatarProp {
  mail: MailType;
  type: TypeChat;
}

const MailItemAvatar = ({ mail, type }: MailItemAvatarProp) => {
  const userEmail = useSelector((state) => state.user.email);
  const user = useSelector((state) => state.user);
  const emailShow = useMemo(() => {
    if (type === TypeChat.DRAFT) {
      return 'Draft';
    }
    if (type === TypeChat.INBOX) {
      return mail.email_address;
    }
    if (
      (type === TypeChat.SENT && mail?.sents_email_address) ||
      (type === TypeChat.SCHEDULE && mail?.sents_email_address)
    ) {
      return mail?.sents_email_address[0]?.email_address;
    }
    return mail.email_addresses;
  }, [mail, type]);

  return (
    <div className="flex h-full items-center justify-center md:hidden ">
      <div
        className={twMerge(
          'ml-1 flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-300 md:w-0',
          type === TypeChat.DRAFT && 'bg-white object-fill',
        )}
      >
        {type !== TypeChat.DRAFT ? (
          <p className="text-lg font-semibold uppercase">
            {type === TypeChat.SENT ? userEmail?.slice(0, 1) : emailShow?.slice(0, 1)}
          </p>
        ) : (
          <img src={user.avatar_img_absolute || ''} alt="avatar" />
        )}
      </div>
    </div>
  );
};

export default MailItemAvatar;
