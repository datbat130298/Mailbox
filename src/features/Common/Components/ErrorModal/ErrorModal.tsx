import { BiError } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import Modal from '../Modal/Modal';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ErrorModal = ({ isOpen, onClose }: ErrorModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentContainerClassName="w-[500px] px-9"
      isShowHeader={false}
      onConfirm={onClose}
    >
      <div className=" flex gap-2">
        <div className="flex flex-col items-start">
          <BiError size={35} className="text-yellow-500" />
        </div>
        <div className="flex flex-1 flex-col items-start gap-4">
          <p className="text-2xl font-semibold">Error</p>
          <p className="">Please specify at least one recipient.</p>
        </div>
        <div className="flex items-start" tabIndex={0} role="button" onClick={onClose}>
          <IoClose
            size={23}
            className="h-6 w-6 rounded-full border-2 border-gray-200 text-gray-700 hover:text-gray-800 hover:shadow-xl"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ErrorModal;
