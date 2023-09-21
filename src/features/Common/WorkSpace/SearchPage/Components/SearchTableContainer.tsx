import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeChat } from '../../../../../app/Enums/commonEnums';
import { BaseQueryParamsType, MailType } from '../../../../../app/Types/commonTypes';
import EmptyData from '../../../Components/EmptyData/EmptyData';
import MailTableContainer from '../../../Components/Mail/MailTableContainer/MailTableContainer';
import SearchHeader from './SearchHeader';

interface SearchTableContainerProp {
  searchData: MailType[];
  setQueryParam: Dispatch<SetStateAction<BaseQueryParamsType>>;
}

const SearchTableContainer = ({ searchData, setQueryParam }: SearchTableContainerProp) => {
  const { t } = useTranslation();
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-0 right-0 top-0 h-full">
        <SearchHeader setQueryParam={setQueryParam} />
      </div>
      <div className="h-full w-full pt-10">
        <MailTableContainer
          mailData={searchData}
          type={TypeChat.INBOX}
          isLoading={false}
          fetchData={() => null}
          actionArray={['']}
          meta={{
            has_next: false,
            has_prev: false,
            per_page: 0,
            page: 0,
            total: 0,
            total_pages: 0,
          }}
          onChangePage={() => null}
          emptyComponent={
            <EmptyData message={t('search_empty_message')} description={t('search_empty_description')} />
          }
        />
      </div>
    </div>
  );
};

export default SearchTableContainer;
