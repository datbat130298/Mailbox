import axiosInstance from '../../../features/utils/Http/axios';
import { BaseQueryParamsType } from '../../Types/commonTypes';
import { generateParamString } from '../Common/CommonService';

const getTrash = async (options: BaseQueryParamsType) => {
  const paramString = generateParamString(
    {
      page: options?.page || 1,
      per_page: options?.perPage || 20,
      'filter[created_at.from]': options?.start,
      'filter[created_at.to]': options?.end,
      'search_by[]': options?.searchBy,
      search: options?.searchValue,
    },
    options?.filterParams,
  );
  const response = await axiosInstance.get(`/mailbox/emails/trash?${paramString}`);
  return response.data;
};

const restoreEmailIds = async (ids: Array<number>) => {
  const response = await axiosInstance.post(`/mailbox/email/restore-emails`, { ids });
  return response.data.data;
};

export { getTrash, restoreEmailIds };
