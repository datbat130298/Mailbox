import axios from 'axios';
import { List, remove } from 'lodash';
import { AuthService } from '../../../app/Services';
import { joinURL } from '../helpers';
import errorHandler from './errorHandler';

declare module 'axios' {
  export interface AxiosRequestConfig {
    redirectWhenError?: boolean;
    autoRefreshToken?: boolean;
    willRedirect?: boolean;
    basePath?: string;
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

axiosInstance.interceptors.request.use((request) => {
  const { url: originUrl, basePath } = request;
  const defaultBasePath = process.env.REACT_APP_BACKEND_API_BASE_PATH!;
  const defaultAuthBasePath = process.env.REACT_APP_BACKEND_API_AUTH_BASE_PATH!;
  let url = originUrl;

  if (!(originUrl!.includes(defaultAuthBasePath) || originUrl!.includes(defaultBasePath))) {
    url = joinURL(basePath ?? defaultBasePath, originUrl);
  }

  request.url = url;

  if (!request.headers['Content-Type']) {
    request.headers['Content-Type'] = 'application/json';
  }

  if (!request.headers.Authorization || request.headers.Authorization.toString().includes('undefined')) {
    const token = AuthService.getAccessToken();

    if (!token) {
      remove(request!.headers as unknown as List<string>, 'Authorization');
    } else {
      request.headers.Authorization = `Bearer ${AuthService.getAccessToken()}`;
    }
  }

  return request;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => errorHandler(error, axiosInstance),
);

export default axiosInstance;
