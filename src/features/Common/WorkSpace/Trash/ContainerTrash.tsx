import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeChat } from '../../../../app/Enums/commonEnums';
import {
  readEmailById,
  unReadEmailById,
} from '../../../../app/Services/ConversationService/ConversationService';
import { getTrash, restoreEmailIds } from '../../../../app/Services/Trash/TrashService';
import { BaseQueryParamsType, MailType } from '../../../../app/Types/commonTypes';
import useNotify from '../../../Hooks/useNotify';
import EmptyData from '../../Components/EmptyData/EmptyData';
import LoadingHeader from '../../Components/Loading/LoadingHeader';
import MailTableContainer from '../../Components/Mail/MailTableContainer/MailTableContainer';

const ContainerTrash = () => {
  const [trashData, setTrashData] = useState<Array<MailType>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [queryParams, setQueryParams] = useState<BaseQueryParamsType>({});

  const { t } = useTranslation();
  const toast = useNotify();

  const fetchData = useCallback(() => {
    setIsLoading(true);
    getTrash({
      perPage: queryParams.perPage,
      page: queryParams.page,
      start: queryParams.start,
      end: queryParams.end,
    })
      .then((data) => {
        setTrashData(data.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [queryParams]);

  const handleChangePage = (page: number) => {
    setQueryParams((prev) => ({ ...prev, perPage: page }));
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
    window.document.title = `${t('trash')} - ${process.env.REACT_APP_WEBSITE_NAME}`;
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

  return (
    <div className="relative h-full w-full rounded-t-lg">
      <MailTableContainer
        handleChangeSearchTerm={handleChangeSearchTerm}
        readEmail={readEmailById}
        unReadEmail={handleClickUnread}
        isLoading={isLoading}
        mailData={trashData}
        type={TypeChat.TRASH}
        fetchData={fetchData}
        meta={{
          has_next: false,
          has_prev: false,
          per_page: 0,
          page: 0,
          total: 0,
          total_pages: 0,
        }}
        onChangePage={handleChangePage}
        onRestoreEmail={restoreEmailIds}
        emptyComponent={
          <EmptyData message={t('trash_empty_message')} description={t('trash_empty_description')} />
        }
      />
      <LoadingHeader isShow={isLoading} />
    </div>
  );
};
export default ContainerTrash;
