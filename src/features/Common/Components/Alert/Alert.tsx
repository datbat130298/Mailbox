import _ from 'lodash';
import { twMerge } from 'tailwind-merge';
import { AlertType } from '../../../../app/Types/elementTypes';
import AlertIcon from './AlertIcon';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  type: AlertType;
  title: string;
  message?: string;
  children?: React.ReactNode;
  onClose?: () => void;
}

const Alert = ({ title, message, type = 'default', className, children, onClose, onClick }: AlertProps) => {
  const handleClick = () => {
    if (_.isFunction(onClose)) {
      onClose();
    }
    if (_.isFunction(onClick)) {
      onClick();
    }
  };

  const generalColors = {
    default: 'bg-blue-50 text-blue-600',
    success: 'bg-green-50 text-green-700',
    error: 'bg-red-50 text-red-600',
    warning: 'bg-yellow-50 text-yellow-700',
  };

  return (
    <div
      className={twMerge('rounded-md px-5 pb-3 pt-4 font-semibold', generalColors[type], className)}
      role="button"
      tabIndex={0}
      onClick={handleClick}
    >
      <div className="flex">
        <div className="mr-4 mt-1 flex-shrink-0 text-lg">
          <AlertIcon type={type} />
        </div>
        <div>
          <div>{title}</div>
          {message && <div className="mt-1.5 font-normal">{message}</div>}
          <div className="mb-0.5 mt-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
