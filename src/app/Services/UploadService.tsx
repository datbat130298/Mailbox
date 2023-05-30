import axiosInstance from '../../features/utils/Http/axiosInstance';
import { COMMON_UPLOAD_FILE_API } from '../Const/COMMON_API';
import { ImageType } from '../Types/commonTypes';

const uploadImage = async (image: File | ImageType) => {
  if (image instanceof File) {
    const formData = new FormData();
    formData.append('img', image);
    const response = await axiosInstance.post(COMMON_UPLOAD_FILE_API.UPLOAD_IMG, formData);
    return response.data.data;
  }
  return image;
};

export { uploadImage };
