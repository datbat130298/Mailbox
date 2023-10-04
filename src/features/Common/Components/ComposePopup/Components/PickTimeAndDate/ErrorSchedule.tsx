import { useTranslation } from 'react-i18next';
import { BiError } from 'react-icons/bi';
import { IoClose } from 'react-icons/io5';
import Modal from '../../../Modal/Modal';

interface ErrorScheduleProp {
  isOpen: boolean;
  onClose: () => void;
}

const ErrorSchedule = ({ isOpen, onClose }: ErrorScheduleProp) => {
  const { t } = useTranslation();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentContainerClassName="w-[380px] h-fit py-0"
      isShowHeader={false}
      onConfirm={onClose}
      isShowFooter={false}
    >
      <div className="flex flex-col p-5 py-7">
        <div className="flex w-full justify-between">
          <div className="flex ">
            <div className="flex h-full w-10 items-start justify-start">
              <BiError size={25} className="text-red-500" />
            </div>
            <p className="text-lg font-semibold">{t('notification')}</p>
          </div>
          <div
            className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-400 text-gray-500"
            role="button"
            tabIndex={0}
            onClick={onClose}
          >
            <IoClose size={20} />
          </div>
        </div>
        <p className="pl-10 pt-2">{t('recipient_and_content_cannot_empty')}</p>
      </div>
    </Modal>
  );
};

export default ErrorSchedule;
