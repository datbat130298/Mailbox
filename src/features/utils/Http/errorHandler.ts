import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { UNAUTHORIZED } from 'http-status';
import { AuthService } from '../../../app/Services';
// eslint-disable-next-line import/no-cycle

const AUTHENTICATION_PATH = {
  LOGIN_PATH: '/auth/login',
};

const errorHandler = async (
  error: { response: AxiosResponse; config: AxiosRequestConfig },
  instance: AxiosInstance,
) => {
  const { response, config } = error;
  let redirectURL = '';
  const redirectWhenError = config?.redirectWhenError;
  if (response) {
    const { status } = response;
    const autoRefreshToken = config?.autoRefreshToken;

    if (autoRefreshToken !== false) {
      if (status === UNAUTHORIZED) {
        const { refreshToken } = AuthService.getAccessTokens();
        if (refreshToken) {
          try {
            const newTokens = await AuthService.refreshAccessToken(refreshToken);
            AuthService.setAccessTokens(newTokens.access_token, newTokens.refresh_token);
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${newTokens.access_token}`,
            };
            config.autoRefreshToken = false;
            return await instance?.(config);
          } catch (refreshError) {
            redirectURL = AUTHENTICATION_PATH.LOGIN_PATH;
          }
        } else {
          redirectURL = AUTHENTICATION_PATH.LOGIN_PATH;
        }
      }
    } else if (redirectWhenError !== false) {
      switch (status) {
        case UNAUTHORIZED: {
          redirectURL = AUTHENTICATION_PATH.LOGIN_PATH;
          break;
        }
        default:
          break;
      }
    }
  }

  if (redirectURL && redirectWhenError) {
    const currentURL = window.location.pathname;
    if (currentURL !== redirectURL) {
      window.location.href = `${redirectURL}?from=${currentURL}`;
    }
  }

  return Promise.reject(error);
};

export default errorHandler;
