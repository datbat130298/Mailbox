import dayjs from 'dayjs';

interface MailItemLabelMonthProp {
  date: string;
}

const MailItemLabelMonth = ({ date }: MailItemLabelMonthProp) => {
  return (
    <div className="flex h-10 w-full items-center justify-start border-b bg-gray-50 px-6 font-semibold text-gray-700">
      {dayjs(date).format('MMMM')}
    </div>
  );
};

export default MailItemLabelMonth;
