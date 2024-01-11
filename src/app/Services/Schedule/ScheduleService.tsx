import axiosInstance from '../../../features/utils/Http/axios';
import { BaseQueryParamsType } from '../../Types/commonTypes';
import { generateParamString } from '../Common/CommonService';

const getSentSchedule = async (options: BaseQueryParamsType) => {
  const paramString = generateParamString(
    {
      'filter[status]': ['SCHEDULE'],
      page: options?.page || 1,
      per_page: options?.perPage || 20,
      'filter[created_at.from]': options?.start,
      'filter[created_at.to]': options?.end,
      'search_by[]': options?.searchBy,
      search: options?.searchValue,
    },
    options?.filterParams,
  );
  const response = await axiosInstance.get(`/sents?${paramString}`);
  return response.data;
};

export { getSentSchedule };
