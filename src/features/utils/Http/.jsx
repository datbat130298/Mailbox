import axios from 'axios';
import { getAccessToken } from '../../../app/Services/Common/AuthService';

/**
 * @file axiosInstanceSingleton.jsx
 * @description This file contains the axios instance, following the singleton pattern.
 */

export default class Axios {
  static instance = null;

  static createInstance() {
    Axios.instance = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_API_URL,
      timeout: 30000,
      responseEncoding: 'utf8',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  static setResponseInterceptor(responseSuccessHandler, responseErrorHandler) {
    Axios.instance.interceptors.response.use(responseSuccessHandler, responseErrorHandler);
  }
}
