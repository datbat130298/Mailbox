/* eslint-disable @typescript-eslint/no-explicit-any */

import axiosInstance from '../../../features/utils/Http/axios';
import { generateParamString } from '../Common/CommonService';

const getMyContact = async (options: any) => {
  const paramString = generateParamString({
    'search[email_address]': options?.searchValue,
    page: options?.page || 1,
    per_page: options?.per_page,
  });
  const response = await axiosInstance.get(`/sent-email-address?${paramString}`);
  return {
    data: response.data.data,
    meta: response.data.meta,
  };
};

export { getMyContact };
