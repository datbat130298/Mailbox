import axiosInstance from '../../../features/utils/Http/axios';
import { BaseQueryParamsType } from '../../Types/commonTypes';
import { TrashDataType } from '../../Types/configTypes';
import { generateParamString } from '../Common/CommonService';

const getConversationById = async (id: number) => {
  const response = await axiosInstance.get(`/mailbox/email/get-email-conversation/${id}`);
  return response.data.data;
};

const getListEmail = async (options: BaseQueryParamsType) => {
  const paramString = generateParamString(
    {
      page: options?.page || 1,
      per_page: options?.perPage || 20,
      'filter[created_at.from]': options?.start,
      'filter[created_at.to]': options?.end,
      'search_by[]': options?.searchBy,
      search: options?.searchValue,
    },
    options.filterParams,
  );
  const response = await axiosInstance.get(`/mailbox/emails?${paramString}`);
  return response.data;
};

const getCountUnread = async () => {
  const response = await axiosInstance.get(`/mailbox/email/count-unread`);
  return response.data.data;
};

const readEmailById = async (data: Array<number>) => {
  const response = await axiosInstance.post(`/mailbox/email/update-read`, { ids: data });
  return response.data;
};

const unReadEmailById = async (data: Array<number>) => {
  const response = await axiosInstance.post(`/mailbox/email/update-unread`, { ids: data });
  return response.data;
};

const deleteEmailById = async (data: Array<TrashDataType>) => {
  const response = await axiosInstance.post(`/mailbox/trash/delete`, { objects: data });
  return response;
};

const rateStarById = async (id: number, value: boolean) => {
  const response = await axiosInstance.put(`/mailbox/email/${id}`, { star: value });
  return response.data.data;
};

const getMailFromServer = async () => {
  const response = await axiosInstance.get(`/mailbox/mail-box`);
  return response.data.data;
};

export {
  getMailFromServer,
  getConversationById,
  getListEmail,
  getCountUnread,
  readEmailById,
  deleteEmailById,
  rateStarById,
  unReadEmailById,
};
