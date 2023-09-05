/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '../../../features/utils/Http/axios';

const sendEmail = async (data: any) => {
  const response = await axiosInstance.post('/mailbox/send-email', data);
  return response.data.data;
};

const getSent = async () => {
  const response = await axiosInstance.get(`/mailbox/sents`);
  return response.data.data;
};

export { getSent, sendEmail };
