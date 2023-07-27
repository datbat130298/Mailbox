/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import { isEmpty } from 'lodash';
import { getAccessToken, refreshAccessToken, setTokens } from '../../../app/Services/Common/AuthService';

const errorHandler = async (error: any, instance: any, handler: any) => {
  const { response, config = {} } = error;
  const { willRedirect, autoRefreshToken } = config;

  const currentURL = window.location.pathname;
  let redirectURL = '';

  if (!isEmpty(response)) {
    const { status } = response;

    if (status === StatusCodes.UNAUTHORIZED && autoRefreshToken !== false) {
      const refreshToken = getAccessToken();

      if (refreshToken) {
        try {
          const { token: newAccessToken } = await refreshAccessToken(refreshToken);

          setTokens(newAccessToken);

          config.headers.Authorization = `Bearer ${newAccessToken}`;
          config.autoRefreshToken = false;

          return instance.request(config);
        } catch (refreshError) {
          redirectURL = `/auth/login`;
        }
      }
    } else {
      switch (response.status) {
        case StatusCodes.UNAUTHORIZED: {
          redirectURL = '/auth/login';
          break;
        }
        case StatusCodes.NOT_FOUND:
          redirectURL = '/error/404';
          break;
        case StatusCodes.FORBIDDEN:
          redirectURL = '/error/403';
          break;
        case StatusCodes.INTERNAL_SERVER_ERROR:
          redirectURL = '/error/500';
          break;
        case StatusCodes.SERVICE_UNAVAILABLE:
          redirectURL = '/error/503';
          break;
        default:
          redirectURL = '/error';
          break;
      }
    }
  } else {
    redirectURL = '/error';
  }

  if (willRedirect !== false) {
    // If `redirectURL` is matched with the current URL, do not redirect.
    if (redirectURL.includes(currentURL)) {
      return Promise.reject(error);
    }

    if (handler) {
      handler(`${redirectURL}?redirect=${currentURL}`);
    } else {
      window.location.href = `${redirectURL}?redirect=${currentURL}`;
    }
  }

  return Promise.reject(error);
};

export default errorHandler;
