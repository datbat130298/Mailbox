import dayjs from 'dayjs';
import { ChangeEventHandler, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoClose } from 'react-icons/io5';
import Modal from '../../../Modal/Modal';
import CalenderModal from './CalenderModal';

interface ComposePopupPickTimeAndDateMobileProp {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (date: string) => void;
}

const ComposePopupPickTimeAndDateMobile = ({
  isOpen,
  onClose,
  onSubmit,
}: ComposePopupPickTimeAndDateMobileProp) => {
  const [selectDay, setSelectDay] = useState(new Date());
  const [selectHour, setSelectHour] = useState(dayjs().format('HH:mm:ss'));
  const [isShowCalender, setIsShowCalender] = useState(false);

  const { t } = useTranslation();

  const handleChangHour: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSelectHour(e.target.value);
  };

  const handleChangeDay: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (new Date(e.target.value) > new Date()) {
      setSelectDay(new Date(e.target.value));
      return;
    }
    setSelectDay(new Date());
  };

  const handleSubmit = () => {
    onSubmit(`${dayjs(selectDay).format('YYYY-MM-DD')} ${selectHour}`);
    onClose();
  };

  const handleCloseCalender = () => {
    setIsShowCalender(false);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isShowHeader={false}
        contentContainerClassName="w-[380px]  pt-6 pb-0 -mb-7"
        // isAllowSubmit={isDisable}
        onConfirm={handleSubmit}
      >
        <div className="flex  items-center justify-between px-9 text-xl font-semibold">
          {t('pick_date_time')}
          <div
            className="rounded-full border border-gray-200 p-1 text-gray-800 hover:bg-slate-100 hover:text-black"
            role="button"
            tabIndex={0}
            onClick={onClose}
          >
            <IoClose size={18} />
          </div>
        </div>
        <div className="gird flex grid-cols-2 px-4 pt-2">
          <div className="col-span-1 mx-6 mb-7 mt-2 w-full">
            <input
              type="date"
              min={dayjs().format('YYYY-MM-DD')}
              value={dayjs(selectDay).format('YYYY-MM-DD')}
              onChange={handleChangeDay}
              onClick={() => setIsShowCalender(true)}
              className="compose h-8 w-full border-b border-gray-300 bg-inherit py-3 text-sm outline-none"
            />
            <input
              type="time"
              value={selectHour}
              onChange={handleChangHour}
              className="compose-time mt-6 h-8 w-full border-b border-gray-300 bg-inherit py-3 text-sm outline-none"
            />
          </div>
        </div>
      </Modal>
      <CalenderModal
        isOpen={isShowCalender}
        onClose={handleCloseCalender}
        setSelectDay={setSelectDay}
        selectDay={selectDay}
      />
    </>
  );
};

export default ComposePopupPickTimeAndDateMobile;
