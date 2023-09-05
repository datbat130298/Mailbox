import axiosInstance from '../../../features/utils/Http/axios';

const getConversationById = async (id: number) => {
  const response = await axiosInstance.get(`/mailbox/email/get-email-conversation/${id}`);
  return response.data.data;
};

const getListEmail = async () => {
  const response = await axiosInstance.get(`/mailbox/emails`);
  return response.data.data;
};

export { getConversationById, getListEmail };
