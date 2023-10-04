import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeChat } from '../../../../app/Enums/commonEnums';
import {
  readEmailById,
  unReadEmailById,
} from '../../../../app/Services/ConversationService/ConversationService';
import { getSentSchedule } from '../../../../app/Services/Schedule/ScheduleService';
import {
  deleteEmailSentById,
  getDetailSentById,
  rateStarSentById,
} from '../../../../app/Services/Sent/SentService';
import { BaseQueryParamsType, MailType } from '../../../../app/Types/commonTypes';
import useNotify from '../../../Hooks/useNotify';
import EmptyData from '../../Components/EmptyData/EmptyData';
import LoadingHeader from '../../Components/Loading/LoadingHeader';
import { MetaType } from '../../Components/Mail/MailTableContainer/HeaderTable/PaginationTable';
import MailTableContainer from '../../Components/Mail/MailTableContainer/MailTableContainer';

const ContainerSchedule = () => {
  const [sentMailData, setSendMailData] = useState<Array<MailType>>([]);
  const [isShowLoading, setIsShowLoading] = useState(false);
  const [meta, setMeta] = useState<MetaType>({
    has_next: false,
    has_prev: false,
    per_page: 0,
    page: 0,
    total: 0,
    total_pages: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [queryParams, setQueryParams] = useState<BaseQueryParamsType>({});

  const toast = useNotify();
  const { t } = useTranslation();

  const fetchData = useCallback(() => {
    setIsLoading(true);
    getSentSchedule({
      perPage: queryParams.perPage,
      page: queryParams.page,
      start: queryParams.start,
      end: queryParams.end,
    })
      .then((data) => {
        setSendMailData(data.data);
        setMeta(data?.meta);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [queryParams]);

  const handleChangePage = (page: number) => {
    setQueryParams((prev) => ({ ...prev, page }));
  };

  const handleClickStar = (id: number, value: boolean) => {
    setIsShowLoading(true);
    if (!id) return;
    rateStarSentById(id, value)
      .catch(() => {
        toast.error(t('action_error'));
        fetchData();
      })
      .finally(() => setIsShowLoading(false));
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
    window.document.title = `${t('sent')} - ${process.env.REACT_APP_WEBSITE_NAME}`;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const handleClickUnread = (ids: Array<number>) => {
    unReadEmailById(ids)
      .then(() => fetchData())
      .catch(() => {
        toast.error(t('action_error'));
        fetchData();
      });
  };

  const handleRemoveItem = useCallback((id: number) => {
    let newArr = [];
    newArr = sentMailData.filter((item) => item.id !== id);
    setSendMailData(newArr);
  }, []);

  return (
    <div className="relative h-full w-full rounded-t-lg">
      <MailTableContainer
        readEmail={readEmailById}
        unReadEmail={handleClickUnread}
        handleChangeSearchTerm={handleChangeSearchTerm}
        getDetailById={getDetailSentById}
        isLoading={isLoading}
        mailData={sentMailData}
        type={TypeChat.SCHEDULE}
        fetchData={fetchData}
        meta={meta}
        onChangePage={handleChangePage}
        deleteEmail={deleteEmailSentById}
        onRateStar={handleClickStar}
        onRemoveItem={handleRemoveItem}
        emptyComponent={
          <EmptyData message={t('sent_empty_message')} description={t('sent_empty_description')} />
        }
      />
      <LoadingHeader isShow={isShowLoading || isLoading} />
    </div>
  );
};

export default ContainerSchedule;
