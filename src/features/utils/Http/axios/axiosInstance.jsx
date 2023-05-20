import axios from 'axios';
import errorHandler from './errorHandler';

/**
 * @type {AxiosInstance}
 */
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
  timeout: 30000,
  responseEncoding: 'utf8',
  withCredentials: true,
});

// Interceptors for request
axiosInstance.interceptors.request.use(
  (request) => {
    // Before Request
    return request;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Before Response
    return response;
  },
  (error) => {
    // console.log({ error });
    // Before Error
    errorHandler(error);

    return Promise.reject(error);
  },
);

export default axiosInstance;
