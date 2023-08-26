import axios from 'axios';
import _ from 'lodash';
import { AuthService } from '../../../app/Services';
import errorHandler from './errorHandler';

declare module 'axios' {
  export interface AxiosRequestConfig {
    redirectWhenError?: boolean;
    autoRefreshToken?: boolean;
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API_URL,
  timeout: 30000,
  responseEncoding: 'utf8',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (request) => {
    if (
      request.headers &&
      !_.isEmpty(AuthService.getAccessTokens().accessToken) &&
      !_.isUndefined(AuthService.getAccessTokens().accessToken)
    ) {
      request.headers.Authorization = `Bearer ${AuthService.getAccessTokens().accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => errorHandler(error, axiosInstance),
);

export default axiosInstance;
