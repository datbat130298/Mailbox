import axiosInstance from '../../../features/utils/Http/axios';
import { BaseQueryParamsType } from '../../Types/commonTypes';
import { generateParamString } from '../Common/CommonService';

const getStarred = async (options: BaseQueryParamsType) => {
  const type = true;
  const queryParams = generateParamString({
    per_page: options.perPage || 20,
    'filter[star]': [type],
    page: options.page || 1,
    'filter[created_at.from]': options?.start,
    'filter[created_at.to]': options?.end,
    'search_by[]': options?.searchBy,
    search: options?.searchValue,
  });
  const response = await axiosInstance.get(`/mailbox/email-searchs?${queryParams}`);
  return response.data;
};

export { getStarred };
