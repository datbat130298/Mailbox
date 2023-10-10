/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '../../../features/utils/Http/axios';
import { BaseQueryParamsType } from '../../Types/commonTypes';
import { TrashDataType } from '../../Types/configTypes';
import { generateParamString } from '../Common/CommonService';

const sendEmail = async (data: any) => {
  const response = await axiosInstance.post('/mailbox/send-email', data);
  return response.data.data;
};

const getDetailSentById = async (id: number) => {
  const response = await axiosInstance.get(`/mailbox/sent/${id}`);
  return response.data.data;
};

const getSent = async (options: BaseQueryParamsType) => {
  const queryParams = generateParamString({
    per_page: options.perPage || 20,
    page: options.page || 1,
    'filter[created_at.from]': options?.start,
    'filter[created_at.to]': options?.end,
    'filter[status]': ['DONE'],
    'search_by[]': options?.searchBy,
    search: options?.searchValue,
  });
  const response = await axiosInstance.get(`/mailbox/sents?${queryParams}`);
  return response.data;
};

const deleteEmailSentById = async (ids: Array<TrashDataType>) => {
  const response = await axiosInstance.post(`/mailbox/trash/delete`, { objects: ids });
  return response.data.data;
};

const rateStarSentById = async (id: number, value: boolean) => {
  const response = await axiosInstance.put(`/mailbox/sent/${id}`, { star: value });
  return response.data.data;
};

export { getSent, sendEmail, deleteEmailSentById, getDetailSentById, rateStarSentById };
