const COMMON_AUTH_API = {
  GETME: '/me',
  REGISTER: '/register',
  LOGIN: '/login',
  LOGOUT: '/logout',
};

const COMMON_UPLOAD_FILE_API = {
  UPLOAD_IMG: 'api/upload-img',
};

const IS_ALLOW_LOGIN_FORM = process.env.REACT_APP_AUTH_LOGIN_TYPE?.includes('form');
const IS_ALLOW_LOGIN_TOKEN = process.env.REACT_APP_AUTH_LOGIN_TYPE?.includes('token');

export { COMMON_AUTH_API, COMMON_UPLOAD_FILE_API, IS_ALLOW_LOGIN_FORM, IS_ALLOW_LOGIN_TOKEN };
