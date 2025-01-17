import axiosInstance from '../../features/utils/Http/axios';

const uploadImage = async (image: File, type: string) => {
  if (image instanceof File) {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('type', type);
    const response = await axiosInstance.post(`/upload-mailbox-file`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      basePath: 'https://api.ps.techupzone.com/beauth_TSLR67tOR3/send',
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

export { getArrayBufferFromURL, getTxtFile, uploadImage };
