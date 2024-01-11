import Cookies from 'universal-cookie';
import axiosInstance from '../../../features/utils/Http/axios';
import storage from '../../../features/utils/storage';
import { COMMON_AUTH_API, IS_ALLOW_LOGIN_FORM, IS_ALLOW_LOGIN_TOKEN } from '../../Const/COMMON_API';
import { AuthLoginType, AuthRegisterFormDataType, AxiosResponseType } from '../../Types/commonTypes';
import { UserDataType } from '../../Types/userTypes';
import { getQueryURL } from './CommonService';

const cookie = new Cookies();

// user__user_detail
const getMe = (): Promise<AxiosResponseType<UserDataType>> =>
  axiosInstance.get(
    getQueryURL(COMMON_AUTH_API.GETME, {
      'expand[]': ['user__user_config', 'user__roles'],
    }),
    {
      willRedirect: false,
      basePath: process.env.REACT_APP_BACKEND_API_AUTH_BASE_PATH,
    },
  );

const getAccessTokens = () => ({
  accessToken: window.localStorage.getItem('access_token') || '',
  refreshToken: window.localStorage.getItem('refresh_token') || '',
});

const setAccessTokens = (accessToken: string, refreshToken: string, isGlobal = false) => {
  if (IS_ALLOW_LOGIN_FORM) {
    storage.local.set('access_token', accessToken);
    storage.local.set('refresh_token', refreshToken);
  }

  if (isGlobal || IS_ALLOW_LOGIN_TOKEN) {
    storage.cookies.set('access_token', accessToken);
    storage.cookies.set('refresh_token', refreshToken);
  }
};

const refreshAccessToken = async (token: string) => {
  const response = await axiosInstance.post(
    'refresh-token',
    {
      token,
    },
    {
      autoRefreshToken: false,
      willRedirect: false,
      basePath: process.env.REACT_APP_BACKEND_API_AUTH_BASE_PATH,
    },
  );

  return response.data.data;
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

const loginWithEmailPassword = (email: AuthLoginType['email'], password: AuthLoginType['password']) =>
  axiosInstance.post(
    getQueryURL(COMMON_AUTH_API.LOGIN, {
      'expand[]': ['user__roles'],
    }),
    {
      email,
      password,
    },
    {
      willRedirect: false,
      basePath: process.env.REACT_APP_BACKEND_API_AUTH_BASE_PATH,
    },
  );

const getLoginStatus = async () => {
  const isLogged = cookie.get('logged');
  if (!isLogged) throw Error();
  return true;
};

const getAccessToken = () => {
  const localToken = storage.local.get('access_token');

  if (localToken) {
    return localToken;
  }

  if (!IS_ALLOW_LOGIN_TOKEN) {
    return null;
  }

  return storage.cookies.get('access_token');
};

const setTokens = (accessToken: string, refreshToken: string, isGlobal = false) => {
  storage.local.set('access_token', accessToken);
  storage.local.set('refresh_token', refreshToken);

  if (isGlobal || IS_ALLOW_LOGIN_TOKEN) {
    storage.cookies.set('access_token', accessToken);
    storage.cookies.set('refresh_token', refreshToken);
  }
};

const clearTokens = (isRemoveGlobal = false) => {
  storage.local.remove('access_token');
  storage.local.remove('refresh_token');

  if (IS_ALLOW_LOGIN_TOKEN || isRemoveGlobal) {
    storage.cookies.remove('access_token');
    storage.cookies.remove('refresh_token');
  }
};

const logOut = async (isRemoveGlobal = false) => {
  const response = await axiosInstance.post(COMMON_AUTH_API.LOGOUT);
  window.localStorage.removeItem('access_token');
  window.localStorage.removeItem('refresh_token');

  clearTokens(isRemoveGlobal);

  return response.data.data;
};
export {
  clearTokens,
  createAccount,
  getAccessToken,
  getAccessTokens,
  getLoginStatus,
  getMe,
  logOut,
  loginWithEmailPassword,
  refreshAccessToken,
  setAccessTokens,
  setTokens,
};
