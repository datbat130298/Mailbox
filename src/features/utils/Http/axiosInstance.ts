/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
// eslint-disable-next-line import/no-cycle

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
    Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
  },
  withCredentials: true,
});

// Interceptors for request

export default axiosInstance;
