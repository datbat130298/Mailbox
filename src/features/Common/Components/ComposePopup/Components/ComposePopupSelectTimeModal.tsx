import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsCalendarEvent } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import Modal from '../../Modal/Modal';
import ComposePopupPickDateAndTimeModal from './ComposePopupPickDateAndTimeModal';

interface ComposePopupSelectTimeModalProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: () => void;
}

const ComposePopupSelectTimeModal = ({ isOpen, setOpen, onSubmit }: ComposePopupSelectTimeModalProps) => {
  const [selectTime, setSelectTime] = useState<number>(0);
  const [isShowSelectTime, setIsShowSelectTime] = useState<boolean>(false);

  const { t } = useTranslation();

  const handleSelectTime = (id: number) => {
    onSubmit();
    setOpen(false);
    setSelectTime(id);
  };

  const selectTimeOption = useMemo(
    () => [
      {
        id: 1,
        label: t('tomorrow_morning'),
        date: dayjs().format('MMM D, YYYY 8:00 A'),
      },
      {
        id: 2,
        label: t('tomorrow_afternoon'),
        date: dayjs().add(1, 'day').format('MMM D, YYYY 13:00 A'),
      },
      {
        id: 3,
        label: t('monday_morning'),
        date: dayjs().add(1, 'day').format('MMM D, YYYY 8:00 A'),
      },
    ],
    [],
  );

  const currentTimezone = useMemo(() => {
    return new Date()
      [Symbol.toPrimitive]('string')
      .slice(new Date()[Symbol.toPrimitive]('string').indexOf('(') + 1, -1);
  }, [isOpen]);

  const handleClickPickTime = () => {
    setIsShowSelectTime(true);
    setOpen(false);
  };

  return (
    <>
      <Modal
        isShowFooter={false}
        isShowHeader={false}
        contentContainerClassName="w-[380px] h-fit py-0"
        isOpen={isOpen}
        onClose={() => setOpen(false)}
        onSubmit={onSubmit}
      >
        <div className="border-b border-gray-300 pb-2">
          <div className="px-6 pb-2 pt-3">
            <div className="flex items-center justify-between px-3 pt-2">
              <span className="text-2xl font-semibold text-gray-700">{t('schedule_send')}</span>
              <div
                className="-mr-3 rounded-full border border-gray-200 p-1 text-gray-800 hover:bg-slate-100 hover:text-black"
                tabIndex={0}
                role="button"
                onClick={() => setOpen(false)}
              >
                <IoClose size={18} />
              </div>
            </div>
          </div>
          <span className="pl-9 pt-3 text-base font-normal text-gray-500">{currentTimezone}</span>
          <div className="pb-2 pt-5">
            {selectTimeOption.map((item, id) => (
              <div
                key={item.id}
                className={twMerge(
                  'flex items-center justify-between px-9 py-2 text-sm font-normal hover:cursor-pointer hover:bg-gray-100',
                  id === selectTime && 'bg-gray-200',
                )}
                tabIndex={0}
                role="button"
                onClick={() => handleSelectTime(id)}
              >
                <div className="flex items-center">{item.label}</div>
                <div className="flex items-center text-gray-500">{item.date}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="flex items-start gap-3 rounded-lg px-9 py-4 hover:bg-gray-100"
          role="button"
          tabIndex={0}
          onClick={handleClickPickTime}
        >
          <span className="text-gray-700">
            <BsCalendarEvent size={20} />
          </span>
          <span className="text-base font-normal  text-gray-800">Pick date & time</span>
        </div>
      </Modal>
      <ComposePopupPickDateAndTimeModal
        isOpen={isShowSelectTime}
        onClose={() => setIsShowSelectTime(false)}
      />
    </>
  );
};

export default ComposePopupSelectTimeModal;
