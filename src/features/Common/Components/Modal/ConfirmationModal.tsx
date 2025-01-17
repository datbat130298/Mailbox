import { useEffect, useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { ConfirmationModalStatusType } from '../../../../app/Types/elementTypes';
import Button from '../Button';
import Modal, { ModalProps } from './Modal';

export interface ConfirmationModalProps extends ModalProps {
  title: string;
  message: string;
  status?: ConfirmationModalStatusType;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onConfirm: () => void;
}

const ConfirmationModal = ({
  isOpen,
  status = 'success',
  title,
  message,
  cancelButtonText,
  confirmButtonText,
  onConfirm,
  onClose,
  ...props
}: ConfirmationModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleClickConfirmButton = () => {
    setIsSubmitting(true);
    onConfirm();
  };

  const handleClickCancelButton = () => {
    onClose();
  };

  const getClassNameByStatus = (statusParam: ConfirmationModalStatusType) => {
    if (statusParam === 'success') {
      return 'flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-green-100 rounded-full sm:mx-0 sm:h-10 sm:w-10';
    }
    if (statusParam === 'danger') {
      return 'flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10';
    }
    return 'flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10';
  };

  const getIconClassNameByStatus = (statusParam: ConfirmationModalStatusType) => {
    if (statusParam === 'success') {
      return 'text-green-500';
    }
    if (statusParam === 'danger') {
      return 'text-red-500';
    }
    return 'text-red-500';
  };

  return (
    <Modal
      isOpen={isOpen}
      isShowHeader={false}
      isShowFooter={false}
      contentContainerClassName="max-w-md"
      onClose={onClose}
      {...props}
    >
      <div className="-mx-10 -my-2 pl-6 sm:flex sm:items-start">
        <div className={getClassNameByStatus(status)}>
          <FiAlertTriangle size={18} className={getIconClassNameByStatus(status)} />
        </div>
        <div className="text-center sm:mx-6 sm:mt-0 sm:text-left">
          <h3 className="mt-2 text-lg font-medium leading-6 text-gray-900">{title}</h3>
          <div className="mt-4">
            <p className="text-sm text-gray-700">{message}</p>
          </div>
        </div>
      </div>
      <div className="-mx-10 -mb-8 mt-9 flex items-center justify-end space-x-4 rounded-b-lg bg-gray-50 px-6 py-5">
        <Button
          type="button"
          size="sm"
          color="light"
          className="rounded-md border-2 border-gray-200 shadow-none ring-0"
          onClick={handleClickCancelButton}
          disabled={isSubmitting}
        >
          {cancelButtonText}
        </Button>
        <Button
          type="button"
          size="sm"
          className="rounded-md border-2 border-primary-700 px-12 shadow-none ring-0 disabled:border-gray-300"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          onClick={handleClickConfirmButton}
        >
          {confirmButtonText}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
