import axiosInstance from '../../features/utils/Http/axios';
import { COMMON_UPLOAD_FILE_API } from '../Const/COMMON_API';

const uploadImage = async (image: File, type: string) => {
  if (image instanceof File) {
    const formData = new FormData();
    formData.append('img', image);
    formData.append('type', type);
    const response = await axiosInstance.post(COMMON_UPLOAD_FILE_API.UPLOAD_IMG, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  }
  return image;
};

const getTxtFile = async (path: string) => {
  const response = await axiosInstance.get(path);
  return response.data;
};

const getArrayBufferFromURL = async (path: string) => {
  const response = await axiosInstance.get(path, { responseType: 'arraybuffer' });
  return response.data;
};

export { uploadImage, getTxtFile, getArrayBufferFromURL };
