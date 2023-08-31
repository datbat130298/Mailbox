import { TypeChat } from '../../../../app/Enums/commonEnums';
import { MailType } from '../../../../app/Types/commonTypes';
import useSelector from '../../../Hooks/useSelector';
import MailTableContainer from '../../Components/Mail/MailTableContainer/MailTableContainer';

const SearchPage = () => {
  const searchData = useSelector((state) => state.mail.mail);

  return (
    <div className="relative h-full w-full rounded-t-lg">
      <MailTableContainer
        mailData={searchData as unknown as MailType[]}
        type={TypeChat.INBOX}
        isLoading={false}
      />
    </div>
  );
};

export default SearchPage;
