import { Id, toast, ToastOptions, TypeOptions } from 'react-toastify';
import ToastMessage from '../Common/Components/ToastMessage/ToastMessage';

type ToastType = 'info' | 'success' | 'warning' | 'error' | 'loading';

type ShowFunction = (
  message: string,
  description?: string,
  config?: ToastOptions,
  toastId?: Id,
  type?: ToastType,
  isLoading?: boolean,
) => void | Id;

type UpdateFunction = () => void;

export interface ShowToastParam {
  message: string;
  description?: string;
  config?: ToastOptions;
  toastId?: Id;
  type?: ToastType;
  isLoading?: boolean;
}

const styleToast = {
  success: 'bg-green-50',
  info: 'bg-white',
  warning: 'bg-yellow-50',
  error: 'bg-red-50',
  loading: 'bg-blue-50',
};

const showFunction: Record<ToastType | 'update', ShowFunction | UpdateFunction> = {} as Record<
  ToastType | 'update',
  ShowFunction
>;

const useNotify = (initialConfig = { className: 'rounded-xl' }) => {
  const showToast = ({ type, message, description, config }: ShowToastParam) => {
    switch (type) {
      case 'success':
        return toast.success(
          <ToastMessage message={message} description={description} />,
          Object.assign(initialConfig, { className: styleToast[type] }, config),
        );
      case 'info':
        return toast.info(
          <ToastMessage message={message} description={description} />,
          Object.assign(initialConfig, { className: styleToast[type] }, config),
        );
      case 'warning':
        return toast.warn(
          <ToastMessage message={message} description={description} />,
          Object.assign(initialConfig, { className: styleToast[type] }, config),
        );
      case 'error':
        return toast.error(
          <ToastMessage message={message} description={description} />,
          Object.assign(initialConfig, { className: styleToast[type] }, config),
        );

      default:
        return toast.loading(
          <ToastMessage message={message} description={description} />,
          Object.assign(initialConfig, { className: 'bg-white' }, config),
        );
    }
  };

  const showUpdateToast = ({ message, description, type, toastId, isLoading }: ShowToastParam) => {
    return toast.update(toastId as Id, {
      isLoading,
      render: <ToastMessage message={message} description={description} />,
      type: type as TypeOptions,
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      closeButton: null,
      className: styleToast[type as ToastType],
    });
  };

  showFunction.success = (message, description, config) =>
    showToast({ type: 'success', message, description, config });
  showFunction.warning = (message, description, config) =>
    showToast({ type: 'warning', message, description, config });
  showFunction.error = (message, description, config) =>
    showToast({ type: 'error', message, description, config });
  showFunction.info = (message, description, config) =>
    showToast({ type: 'info', message, description, config });
  showFunction.loading = (message, description, config) =>
    showToast({ type: undefined, message, description, config });
  showFunction.update = (message, description, config, toastId, type, isLoading) =>
    showUpdateToast({ message, description, config, toastId, type, isLoading });

  return showFunction;
};

export default useNotify;
