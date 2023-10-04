import { twMerge } from 'tailwind-merge';
import { convertHtmlToString } from '../../../../../../utils/helpers';

interface MailItemBodyProp {
  body: string;
}

const MailItemBody = ({ body }: MailItemBodyProp) => {
  return (
    <div className={twMerge('my-auto line-clamp-1 h-fit flex-1 text-ellipsis text-left text-gray-700 ')}>
      {`${convertHtmlToString(body)}`}
    </div>
  );
};

export default MailItemBody;
