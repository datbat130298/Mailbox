import dayjs from 'dayjs';
import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import Input from '../Form/Input';
import { OptionOP, SelectOP } from '../Select';

interface SelectTimeRangeProps {
  timeRange: string;
  setTimeRange: Dispatch<SetStateAction<string>>;
  dateKeyWork: string;
  setDateKeyWork: Dispatch<SetStateAction<string>>;
}

const SelectTimeRange = ({ timeRange, setTimeRange, dateKeyWork, setDateKeyWork }: SelectTimeRangeProps) => {
  const { t } = useTranslation();
  const timeRangeList = [
    {
      label: t('1_day'),
      value: '1_day',
    },
    {
      label: t('3_days'),
      value: '3_days',
    },
    {
      label: t('1_week'),
      value: '1_week',
    },
    {
      label: t('2_weeks'),
      value: '2_weeks',
    },
    {
      label: t('1_month'),
      value: '1_month',
    },
    {
      label: t('2_months'),
      value: '2_months',
    },
    {
      label: t('6_months'),
      value: '6_months',
    },
    {
      label: t('1_year'),
      value: '1_year',
    },
  ];

  return (
    <div className="mb-0.5 grid h-fit w-full grid-cols-5 gap-x-3">
      <div className="col-span-1 h-10 text-left text-sm font-[400] leading-[48px] text-gray-600">
        {t('day_within')}
      </div>
      <div className="col-span-2 flex h-10  items-end justify-end">
        <SelectOP
          defaultValue={timeRange}
          className={twMerge(
            'w-full -translate-y-[8px] border-b-[1px] border-gray-100  text-sm font-[400] text-gray-600',
          )}
          onChange={(e) => setTimeRange(e)}
          selectClassName="border-none"
        >
          {timeRangeList.map((item) => (
            <OptionOP
              key={item.value}
              value={item.value}
              className="flex w-fit text-sm font-[400] text-gray-600"
            >
              <div className="w-40 text-left">{item.label}</div>
            </OptionOP>
          ))}
        </SelectOP>
      </div>
      <div className="col-span-2 h-10">
        <Input
          type="date"
          value={dayjs(dateKeyWork).format('YYYY-MM-DD')}
          max={dayjs(new Date()).format('YYYY-MM-DD')}
          onChange={(e) => setDateKeyWork(e.target.value)}
          size="sm"
          className="h-full w-full rounded-none border-[1px] border-x-0 border-t-0 border-gray-100 bg-transparent px-0 pb-[7px] shadow-gray-100"
          inputClassName="text-sm font-[400]  text-gray-600"
        />
      </div>
    </div>
  );
};

export default SelectTimeRange;
