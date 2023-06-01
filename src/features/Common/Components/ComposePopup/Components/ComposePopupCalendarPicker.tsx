import { Dispatch, SetStateAction } from 'react';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import './style.scss';

interface ComposePopupCalendarProps {
  setSelectDay: Dispatch<SetStateAction<Date>>;
  selectDay: Date;
}

const ComposePopupCalendar = ({ setSelectDay, selectDay }: ComposePopupCalendarProps) => {
  return (
    <div className="flex h-fit w-fit justify-center">
      <Calendar date={selectDay} onChange={setSelectDay} color="#BF1922" fixedHeight />
    </div>
  );
};

export default ComposePopupCalendar;
