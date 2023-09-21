/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '../../../features/utils/Http/axios';
import { generateParamString } from '../Common/CommonService';

const search = async (options: any) => {
  const paramString = generateParamString({
    [`search[subject]`]: options.subject,
    'search_by[]': options?.searchBy,
    search: options?.searchValue,
  });
  const response = await axiosInstance.get(`/mailbox/emails?${paramString}`);

  return response.data.data;
};

export { search };
