/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from '../../../features/utils/Http/axios';

const getAllFolder = async () => {
  const response = await axiosInstance.get(`/folders`);
  return response.data.data;
};

const editFolder = async (id: number, data: any) => {
  const response = await axiosInstance.put(`/folder/${id}`, data);
  return response.data.data;
};

const addFolder = async (data: any) => {
  const response = await axiosInstance.post(`/folder`, data);
  return response.data.data;
};

const removeFolderById = async (id: number) => {
  const response = await axiosInstance.delete(`/folder/${id}`);
  return response.data.data;
};

export { addFolder, editFolder, getAllFolder, removeFolderById };
