import axios from 'axios';

/**
 * @file axiosInstanceSingleton.jsx
 * @description This file contains the axios instance, following the singleton pattern.
 */

export default class AxiosInstanceSingleton {
  static instance = null;

  constructor() {
    if (!AxiosInstanceSingleton.instance) {
      AxiosInstanceSingleton.instance = axios.create({
        baseURL: process.env.REACT_APP_BACKEND_API_URL,
        timeout: 30000,
        responseEncoding: 'utf8',
        withCredentials: true,
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  get instance() {
    return AxiosInstanceSingleton.instance;
  }

  // eslint-disable-next-line class-methods-use-this
  setResponseInterceptor(responseSuccessHandler, responseErrorHandler) {
    AxiosInstanceSingleton.instance.interceptors.response.use(responseSuccessHandler, responseErrorHandler);
  }
}
