import dayjs from 'dayjs';
import { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoClose } from 'react-icons/io5';
import Modal from '../../../Modal/Modal';
import ComposePopupCalendar from '../ComposePopupCalendar';

interface ComposePopupPickDateAndTimeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (date: string) => void;
}

const ComposePopupPickDateAndTimeModal = ({
  isOpen,
  onClose,
  onSubmit,
}: ComposePopupPickDateAndTimeModalProps) => {
  const [selectDay, setSelectDay] = useState(new Date());
  const [selectHour, setSelectHour] = useState(dayjs().format('HH:mm:ss'));

  const { t } = useTranslation();

  const handleChangeDay: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (new Date(e.target.value) > new Date()) {
      setSelectDay(new Date(e.target.value));
      return;
    }
    setSelectDay(new Date());
  };

  const handleChangHour: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSelectHour(e.target.value);
  };

  const isDisable = useMemo(() => {
    if (new Date(selectDay) > new Date()) {
      return true;
    }
    return false;
  }, [selectDay]);

  const handleSubmitCustomTime = useCallback(() => {
    onSubmit(`${dayjs(selectDay).format('YYYY-MM-DD')} ${selectHour}`);
    onClose();
  }, [selectDay, selectHour]);

  useEffect(() => {
    if (!isOpen) {
      setSelectDay(new Date());
      setSelectHour(dayjs().format('HH:mm:ss'));
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isShowHeader={false}
      contentContainerClassName="w-[650px] h-[420px] pt-6 pb-0 -mb-7"
      isAllowSubmit={isDisable}
      onConfirm={handleSubmitCustomTime}
    >
      <div className="flex  items-center justify-between pl-8 pr-9 text-xl font-semibold">
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
      <div className="gird flex grid-cols-2 px-3 pt-6">
        <div className="col-span-1">
          <ComposePopupCalendar setSelectDay={setSelectDay} selectDay={selectDay} />
        </div>
        <div className="col-span-1 mx-6 mt-2 w-full">
          <input
            type="date"
            min={dayjs().format('YYYY-MM-DD')}
            value={dayjs(selectDay).format('YYYY-MM-DD')}
            onChange={handleChangeDay}
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
  );
};

export default ComposePopupPickDateAndTimeModal;
