import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeChat } from '../../../../app/Enums/commonEnums';
import {
  rateStarById,
  readEmailById,
  unReadEmailById,
} from '../../../../app/Services/ConversationService/ConversationService';
import { rateStarSentById } from '../../../../app/Services/Sent/SentService';
import { getStarred } from '../../../../app/Services/Starred/StarredService';
import { BaseQueryParamsType, MailType } from '../../../../app/Types/commonTypes';
import useNotify from '../../../Hooks/useNotify';
import EmptyData from '../../Components/EmptyData/EmptyData';
import LoadingHeader from '../../Components/Loading/LoadingHeader';
import { MetaType } from '../../Components/Mail/MailTableContainer/HeaderTable/PaginationTable';
import MailTableContainer from '../../Components/Mail/MailTableContainer/MailTableContainer';

const Starred = () => {
  const [starredData, setStarredData] = useState<Array<MailType>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState<MetaType>({
    has_next: false,
    has_prev: false,
    per_page: 0,
    page: 0,
    total: 0,
    total_pages: 0,
  });
  const [queryParams, setQueryParams] = useState<BaseQueryParamsType>({});
  const [isShowLoading, setIsShowLoading] = useState(false);

  const toast = useNotify();
  const { t } = useTranslation();

  const fetchData = useCallback(() => {
    setIsLoading(true);
    getStarred({
      perPage: queryParams.perPage,
      page: queryParams.page,
      start: queryParams.start,
      end: queryParams.end,
    })
      .then((data) => {
        setStarredData(data.data);
        setMeta(data?.meta);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [queryParams]);

  const handleChangePage = (page: number) => {
    setQueryParams((prev) => ({ ...prev, page }));
  };

  const handleClickStar = (id: number, value: boolean, type?: TypeChat) => {
    setIsShowLoading(true);
    if (!id) return;
    if (type === TypeChat.SENTS) {
      rateStarSentById(id, value)
        .catch(() => {
          toast.error(t('action_error'));
          fetchData();
        })
        .finally(() => setIsShowLoading(false));
    }
    if (type === TypeChat.EMAIL) {
      rateStarById(id, value)
        .catch(() => {
          toast.error(t('action_error'));
          fetchData();
        })
        .finally(() => setIsShowLoading(false));
    }
  };

  const handleChangeSearchTerm = (valueSearch: BaseQueryParamsType, typeSearch: string) => {
    if (_.isObject(valueSearch)) {
      setQueryParams((prev) => ({
        ...prev,
        filterBy: typeSearch,
        start: valueSearch.start,
        end: valueSearch.end,
      }));
    }
  };

  useEffect(() => {
    fetchData();
  }, [queryParams]);

  useEffect(() => {
    window.document.title = `${t('starred')} - ${process.env.REACT_APP_WEBSITE_NAME}`;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const handleRemoveItem = useCallback(
    (id: number) => {
      let newArr = [];
      newArr = starredData.filter((item) => item.id !== id);
      setStarredData(newArr);
    },
    [starredData],
  );

  const handleClickUnread = (ids: Array<number>) => {
    unReadEmailById(ids)
      .then(() => fetchData())
      .catch(() => {
        toast.error(t('action_error'));
        fetchData();
      });
  };

  return (
    <div className="relative h-full w-full rounded-t-lg">
      <MailTableContainer
        isLoading={isLoading}
        mailData={starredData}
        type={TypeChat.STARRED}
        fetchData={fetchData}
        readEmail={readEmailById}
        unReadEmail={handleClickUnread}
        meta={meta}
        onChangePage={handleChangePage}
        onRateStar={handleClickStar}
        handleChangeSearchTerm={handleChangeSearchTerm}
        onRemoveItem={handleRemoveItem}
        emptyComponent={
          <EmptyData message={t('starred_empty_message')} description={t('starred_empty_description')} />
        }
      />
      <LoadingHeader isShow={isShowLoading || isLoading} />
    </div>
  );
};
export default Starred;
