import * as HttpStatus from "http-status-codes";
import { store } from "../../../../../app/store";
import { setErrors } from "../../../../Errors/errorSlice";

const { dispatch } = store;

const errorHandler = (error) => {
  const { response, config } = error;
  const willRedirect = config?.willRedirect;
  const currentURL = encodeURIComponent(new URL(window.location.href).pathname);

  if (response) {
    if (response.status === HttpStatus.UNPROCESSABLE_ENTITY) {
      dispatch(setErrors(response.data.errors));
    } else if (willRedirect !== false) {
      switch (response.status) {
        case HttpStatus.UNAUTHORIZED: {
          window.location.href = `/auth/login/?redirect=${currentURL}`;
          break;
        }
        case HttpStatus.NOT_FOUND:
          window.location.href = "/error/404";
          break;
        case HttpStatus.FORBIDDEN:
          window.location.href = "/error/403";
          break;
        case HttpStatus.INTERNAL_SERVER_ERROR:
          window.location.href = "/error/500";
          break;
        case HttpStatus.SERVICE_UNAVAILABLE:
          window.location.href = "/error/503";
          break;
        default:
          break;
      }
    }
  } else if (willRedirect !== false) {
    if (currentURL.includes("error")) {
      return;
    }

    window.location.href = `/error?redirect=${currentURL}`;
  }
};

export default errorHandler;
