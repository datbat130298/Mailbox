import axiosInstance from '../../../features/utils/Http/axios';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const uploadSettingSidebar = async (value: any) => {
  const response = await axiosInstance.post(`/mailbox/setting`, { value });
  return response.data.data;
};

const getSettingLabel = async () => {
  const response = await axiosInstance.get(`/mailbox/setting`);
  return response.data.data;
};

export { uploadSettingSidebar, getSettingLabel };
