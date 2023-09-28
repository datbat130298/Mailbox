import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import {
  readEmailById,
  unReadEmailById,
} from '../../../../app/Services/ConversationService/ConversationService';
import { search } from '../../../../app/Services/Search/SearchService';
import { BaseQueryParamsType, MailType } from '../../../../app/Types/commonTypes';
import useNotify from '../../../Hooks/useNotify';
import { queryParamsDefault } from '../../../utils/helpers';
import LoadingHeader from '../../Components/Loading/LoadingHeader';
import { MetaType } from '../../Components/Mail/MailTableContainer/HeaderTable/PaginationTable';
import SearchTableContainer from './Components/SearchTableContainer';

const SearchPage = () => {
  const { t } = useTranslation();
  const toast = useNotify();
  const location = useLocation();

  const [data, setData] = useState<MailType[]>([]);
  const [, setQuery] = useState<BaseQueryParamsType>(queryParamsDefault);
  const [meta, setMeta] = useState<MetaType>({
    has_next: false,
    has_prev: false,
    per_page: 0,
    page: 0,
    total: 0,
    total_pages: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  // const isFirstRender = useRef(false);

  const searchUrl = location.search.substring(1);

  const parseParams = (params: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const output: any = [];
    const searchParams = new URLSearchParams(params);

    // Set will return only unique keys()
    new Set([...searchParams.keys()]).forEach((key) => {
      output[key] =
        searchParams.getAll(key).length > 1
          ? searchParams.getAll(key) // get multiple values
          : searchParams.get(key); // get single value
    });

    return output;
  };

  const handleSearch = useCallback((queryParams: BaseQueryParamsType) => {
    setIsLoading(true);
    search({
      perPage: queryParams?.perPage,
      page: queryParams?.page,
      start: queryParams?.start,
      end: queryParams?.end,
      filterBy: queryParams?.filterBy,
      filterValue: queryParams?.filterValue,
      filterParams: queryParams?.filterParams,
      source: queryParams?.source,
      toMail: queryParams?.toMail,
      fromMail: queryParams?.fromMail,
      subject: queryParams?.subject,
      body: queryParams?.body,
    })
      .then((res) => {
        setMeta(res.meta);
        setData(res.data);
      })
      .catch(() => toast.error(t('action_error')))
      .finally(() => setIsLoading(false));
  }, []);

  const handleClickUnread = (ids: Array<number>) => {
    unReadEmailById(ids)
      .then(() => setQuery(queryParamsDefault))
      .catch(() => {
        toast.error(t('action_error'));
        setQuery(queryParamsDefault);
      });
  };

  useEffect(() => {
    const querySearch = parseParams(searchUrl);
    handleSearch({
      subject: querySearch?.subject,
      body: querySearch?.body,
      toMail: querySearch?.to,
      fromMail: querySearch?.from,
      source: querySearch?.type,
      page: querySearch?.page,
      end: querySearch?.end,
      start: querySearch?.start,
    });
  }, [searchUrl]);

  return (
    <div className="relative h-full w-full rounded-t-lg">
      <SearchTableContainer
        searchData={data}
        meta={meta}
        readEmail={readEmailById}
        unReadEmail={handleClickUnread}
      />
      <LoadingHeader isShow={isLoading} />
    </div>
  );
};

export default SearchPage;
