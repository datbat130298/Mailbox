import { useTranslation } from 'react-i18next';
import { TypeChat } from '../../../../../app/Enums/commonEnums';
import { MailType } from '../../../../../app/Types/commonTypes';
import EmptyData from '../../../Components/EmptyData/EmptyData';
import { MetaType } from '../../../Components/Mail/MailTableContainer/HeaderTable/PaginationTable';
import MailTableContainer from '../../../Components/Mail/MailTableContainer/MailTableContainer';
import SearchHeader from './SearchHeader';

interface SearchTableContainerProp {
  searchData: MailType[];
  readEmail: (ids: Array<number>) => Promise<void>;
  unReadEmail: (ids: Array<number>) => void;
  meta: MetaType;
}

const SearchTableContainer = ({ searchData, meta, readEmail, unReadEmail }: SearchTableContainerProp) => {
  const { t } = useTranslation();
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-0 right-0 top-0 h-full">
        <SearchHeader />
      </div>
      <div className="h-full w-full pt-[46px]">
        <MailTableContainer
          readEmail={readEmail}
          unReadEmail={unReadEmail}
          mailData={searchData}
          type={TypeChat.SEARCH}
          isLoading={false}
          fetchData={() => null}
          actionArray={['']}
          meta={meta}
          emptyComponent={
            <EmptyData message={t('search_empty_message')} description={t('search_empty_description')} />
          }
        />
      </div>
    </div>
  );
};

export default SearchTableContainer;
