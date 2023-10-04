import { Dispatch, SetStateAction } from 'react';
import Modal from '../../../Modal/Modal';
import ComposePopupCalendar from '../ComposePopupCalendar';

interface CalenderModalProp {
  isOpen: boolean;
  onClose: () => void;
  setSelectDay: Dispatch<SetStateAction<Date>>;
  selectDay: Date;
}

const CalenderModal = ({ isOpen, onClose, setSelectDay, selectDay }: CalenderModalProp) => {
  const handleChangeCalender = (date: Date) => {
    setSelectDay(date);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isShowHeader={false}
      contentContainerClassName="w-[380px]  pt-6 pb-0 -mb-7"
      onConfirm={onClose}
    >
      <div className="flex w-full items-center justify-center">
        <ComposePopupCalendar
          setSelectDay={setSelectDay}
          onChange={handleChangeCalender}
          selectDay={selectDay}
        />
      </div>
    </Modal>
  );
};

export default CalenderModal;
