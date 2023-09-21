import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { getListEmail } from '../../../../app/Services/ConversationService/ConversationService';
import { BaseQueryParamsType, MailType } from '../../../../app/Types/commonTypes';
import useNotify from '../../../Hooks/useNotify';
import useSelector from '../../../Hooks/useSelector';
import { queryParamsDefault } from '../../../utils/helpers';
import LoadingHeader from '../../Components/Loading/LoadingHeader';
import SearchTableContainer from './Components/SearchTableContainer';

const SearchPage = () => {
  const searchData = useSelector((state) => state.mail.mail);
  // const dispatch = useDispatch();
  const { t } = useTranslation();
  const toast = useNotify();

  const [data, setData] = useState<MailType[]>([]);
  const [queryParams, setQueryParam] = useState<BaseQueryParamsType>(queryParamsDefault);
  const [isLoading, setIsLoading] = useState(false);
  const [, setSearchParams] = useSearchParams();

  const handleSearch = useCallback(() => {
    setIsLoading(true);
    setSearchParams('');
    getListEmail({
      perPage: queryParams.perPage,
      page: queryParams.page,
      start: queryParams.start,
      end: queryParams.end,
      filterBy: queryParams.filterBy,
      filterValue: queryParams.filterValue,
      filterParams: queryParams.filterParams,
    })
      .then((res) => {
        setData(res.data);
      })
      .catch(() => toast.error(t('action_error')))
      .finally(() => setIsLoading(false));
  }, [queryParams]);

  useEffect(() => {
    setData(searchData as unknown as MailType[]);
  }, [searchData]);

  useEffect(() => {
    handleSearch();
    // dispatch(setMail(null));
    setSearchParams('');
  }, [queryParams]);

  return (
    <div className="relative h-full w-full rounded-t-lg">
      <SearchTableContainer searchData={data} setQueryParam={setQueryParam} />
      <LoadingHeader isShow={isLoading} />
    </div>
  );
};

export default SearchPage;
