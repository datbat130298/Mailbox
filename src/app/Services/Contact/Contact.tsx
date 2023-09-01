/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from '../../../features/utils/Http/axios';
import { generateParamString } from '../Common/CommonService';

const getMyContact = async (options: any) => {
  const paramString = generateParamString(
    {
      'search_by[]': options?.searchBy,
      search: options?.searchValue,
      [`filter[${options?.type}]`]: options?.searchTerm,
      // [`filter[exact__${options?.typeArray}]`]: [options?.arraySearch],
      [`filter[${options?.typeRelative}]`]: options?.searchTermRelative,
      [`filter[from__${options?.typeDate}]`]: options?.fromDate,
      [`filter[to__${options?.typeDate}]`]: options?.toDate,
      [`sort`]: options?.sortTerm,
      page: options?.page || 1,
      per_page: options?.per_page,
    },
    options?.filterParams,
  );
  const response = await axiosInstance.get(`/api/my/contacts?${paramString}`);
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

export { getMyContact };
