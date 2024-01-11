/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '../../../features/utils/Http/axios';
import { generateParamString } from '../Common/CommonService';

const search = async (options: any) => {
  const paramString = generateParamString(
    {
      page: options?.page || 1,
      per_page: options?.perPage || 20,
      'filter[created_at.from]': options?.start,
      'filter[created_at.to]': options?.end,
      'search_by[]': options?.searchBy,
      search: options?.searchValue,
      'search[email_addresses]': options?.toMail,
      'search[from_email]': options?.fromMail,
      'source[source]': options?.source,
      'source[subject]': options?.subject,
      'source[body]': options?.body,
    },
    options.filterParams,
  );
  const response = await axiosInstance.get(`/email-searchs?${paramString}`);

  return response.data;
};

export { search };
