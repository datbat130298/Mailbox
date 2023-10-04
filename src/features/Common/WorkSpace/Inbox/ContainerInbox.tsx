import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeChat } from '../../../../app/Enums/commonEnums';
import {
  deleteEmailById,
  getConversationById,
  getListEmail,
  rateStarById,
  readEmailById,
  unReadEmailById,
} from '../../../../app/Services/ConversationService/ConversationService';
import { BaseQueryParamsType, MailType } from '../../../../app/Types/commonTypes';
import useNotify from '../../../Hooks/useNotify';
import EmptyData from '../../Components/EmptyData/EmptyData';
import LoadingHeader from '../../Components/Loading/LoadingHeader';
import { MetaType } from '../../Components/Mail/MailTableContainer/HeaderTable/PaginationTable';
import MailTableContainer from '../../Components/Mail/MailTableContainer/MailTableContainer';

const ContainerInbox = () => {
  const [inboxData, setInboxData] = useState<Array<MailType>>([]);
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
  const [isShowLoading, setIsShowLoading] = useState(false);

  const { t } = useTranslation();
  const toast = useNotify();

  const fetchDataListEmail = useCallback(() => {
    setIsLoading(true);
    getListEmail({
      perPage: queryParams.perPage,
      page: queryParams.page,
      start: queryParams.start,
      end: queryParams.end,
    })
      .then((res) => {
        setInboxData(res.data);
        setMeta(res.meta);
      })
      .finally(() => {
        setIsLoading(false);
        setIsShowLoading(false);
      });
  }, [queryParams]);

  const handleChangePage = (page: number) => {
    setQueryParams((prev) => ({ ...prev, page }));
  };

  useEffect(() => {
    fetchDataListEmail();
  }, [queryParams]);

  useEffect(() => {
    window.document.title = `${t('inbox')} - ${process.env.REACT_APP_WEBSITE_NAME}`;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

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

  const handleClickStar = (id: number, value: boolean) => {
    setIsShowLoading(true);
    if (!id) return;
    rateStarById(id, value)
      .catch(() => {
        toast.error(t('action_error'));
        fetchDataListEmail();
      })
      .finally(() => setIsShowLoading(false));
  };

  const handleClickUnread = (ids: Array<number>) => {
    setIsShowLoading(true);
    unReadEmailById(ids)
      .then(() => {
        if (ids.length > 1) {
          fetchDataListEmail();
        }
      })
      .catch(() => {
        toast.error(t('action_error'));
        fetchDataListEmail();
      });
  };

  return (
    <div className="relative h-full w-full rounded-t-lg">
      <MailTableContainer
        handleChangeSearchTerm={handleChangeSearchTerm}
        getDetailById={getConversationById}
        isLoading={isLoading}
        mailData={inboxData}
        type={TypeChat.INBOX}
        readEmail={readEmailById}
        unReadEmail={handleClickUnread}
        fetchData={fetchDataListEmail}
        deleteEmail={deleteEmailById}
        meta={meta}
        onChangePage={handleChangePage}
        onRateStar={handleClickStar}
        emptyComponent={<EmptyData message={t('inbox_empty_message')} />}
      />
      <LoadingHeader isShow={isShowLoading || isLoading} />
    </div>
  );
};
export default ContainerInbox;
