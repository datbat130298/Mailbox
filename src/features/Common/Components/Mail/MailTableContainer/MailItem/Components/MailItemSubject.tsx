import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import useSelector from '../../../../../../Hooks/useSelector';

interface MailItemSubjectProp {
  isReadMail: boolean;
  subject: string;
}

const MailItemSubject = ({ isReadMail, subject }: MailItemSubjectProp) => {
  const { t } = useTranslation();
  const { itemMailStyle } = useSelector((state) => state.layout);

  return (
    <div
      className={twMerge(
        'my-auto line-clamp-1 flex h-full w-fit text-left font-semibold text-gray-900 md:items-center',
        isReadMail && 'font-normal',
        itemMailStyle === 'classic' && 'flex-1 md:flex-none md:items-baseline',
      )}
    >
      <p className="line-clamp-1 text-ellipsis">{!subject ? t('no_subject') : subject}</p>
    </div>
  );
};

export default MailItemSubject;
