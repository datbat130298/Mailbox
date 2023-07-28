import Cookies from 'universal-cookie';
import axiosInstance from '../../../features/utils/Http/axiosInstance';
import { COMMON_AUTH_API } from '../../Const/COMMON_API';
import {
  AuthLoginType,
  AuthRegisterFormDataType,
  AuthTokensType,
  AxiosResponseType,
} from '../../Types/commonTypes';
import { UserDataType } from '../../Types/userTypes';
import { getQueryURL } from './CommonService';

// user__user_detail
const getMe = (): Promise<AxiosResponseType<UserDataType>> =>
  axiosInstance.get(
    getQueryURL(COMMON_AUTH_API.GETME, {
      'expand[]': ['user__user_config', 'user__roles'],
    }),
    {
      redirectWhenError: false,
    },
  );

const getAccessTokens = () => ({
  accessToken: window.localStorage.getItem('accessToken') || '',
  refreshToken: window.localStorage.getItem('refreshToken') || '',
});

const setAccessTokens = (
  accessToken: AuthTokensType['accessToken'],
  refreshToken: AuthTokensType['refreshToken'],
) => {
  window.localStorage.setItem('accessToken', accessToken);
  window.localStorage.setItem('refreshToken', refreshToken);
};

const refreshAccessToken = (refreshToken: AuthTokensType['refreshToken']): Promise<AuthTokensType> => {
  return new Promise((resolve) => {
    window.setTimeout(() => {
      resolve({
        accessToken: 'newAccessToken',
        refreshToken,
      });
    }, 1000);
  });
};

const createAccount = ({
  username,
  fullName,
  email,
  password,
  passwordConfirmation,
}: AuthRegisterFormDataType) => {
  const [firstName, ...lastName] = fullName.split(' ');
  return axiosInstance.post(COMMON_AUTH_API.REGISTER, {
    first_name: firstName,
    last_name: lastName.join(' '),
    username,
    email,
    password,
    password_confirmation: passwordConfirmation,
  });
};

const loginWithEmailPassword = (
  email: AuthLoginType['email'],
  password: AuthLoginType['password'],
): Promise<AxiosResponseType<UserDataType>> =>
  axiosInstance.post(
    getQueryURL(COMMON_AUTH_API.LOGIN, {
      'expand[]': ['roles'],
    }),
    {
      email,
      password,
    },
  );

const logOut = () => axiosInstance.post(COMMON_AUTH_API.LOGOUT);

const getLoginStatus = async () => {
  const cookie = new Cookies();
  const isLogged = cookie.get('logged');
  if (!isLogged) throw Error();
  return true;
};

const getAccessToken = () => {
  return window.localStorage.getItem('access_token');
};

const setTokens = (accessToken: string) => {
  window.localStorage.setItem('access_token', accessToken);
};

export {
  getAccessToken,
  setTokens,
  getMe,
  logOut,
  createAccount,
  getAccessTokens,
  setAccessTokens,
  refreshAccessToken,
  loginWithEmailPassword,
  getLoginStatus,
};
