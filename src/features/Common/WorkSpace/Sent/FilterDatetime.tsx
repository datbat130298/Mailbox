import { useEffect, useRef, useState } from 'react';
import { BsCalendar4 } from 'react-icons/bs';
import { twMerge } from 'tailwind-merge';
import Button from '../../Components/Button';
import Input from '../../Components/Form/Input';

interface FilterItemType {
  uuid: number;
  label: string;
  value: string;
}

const FilterDatetime = () => {
  const filterRef = useRef<HTMLDivElement>(null);
  const [isShowFilterDropdown, setIsShowFilterDropdown] = useState(false);
  const [selectFilterBy, setSelectFilterBy] = useState('');
  const filterByData: FilterItemType[] = [
    {
      uuid: 1,
      label: 'Any time',
      value: 'any_time',
    },
    {
      uuid: 2,
      label: 'Last 7 days',
      value: 'last7days',
    },
    {
      uuid: 3,
      label: 'Last 30 days',
      value: 'last30days',
    },
    {
      uuid: 4,
      label: 'Last 6 months',
      value: 'last6months',
    },
    {
      uuid: 5,
      label: 'Custom range',
      value: 'custom_range',
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsShowFilterDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [filterRef]);
  return (
    <div className="relative" ref={filterRef}>
      <div
        className="my-3 flex h-8 w-fit rounded-md px-2  hover:bg-gray-100 hover:text-primary-700"
        role="button"
        tabIndex={0}
        onClick={() => {
          setIsShowFilterDropdown(true);
        }}
      >
        <div className="flex-center h-full w-max">
          <BsCalendar4 size={14} />
        </div>
        <div className="ml-1 text-sm leading-8">Time</div>
      </div>
      <div
        className={twMerge(
          'absolute left-0 top-[52px] z-50 hidden h-fit w-fit rounded-md bg-white p-1 text-gray-500 shadow-box',
          isShowFilterDropdown && 'block',
        )}
      >
        {selectFilterBy !== 'custom_range' &&
          filterByData?.map((item) => (
            <div
              className={twMerge(
                'flex h-8 w-full rounded-sm hover:bg-gray-200 hover:text-primary-700',
                selectFilterBy === item?.value && 'bg-gray-200 text-primary-700',
              )}
              key={item.uuid}
              role="button"
              tabIndex={0}
              onClick={() => {
                setSelectFilterBy(item.value);
              }}
            >
              <div className="h-full w-40 px-9 text-start  text-sm leading-8">{item.label}</div>
            </div>
          ))}
        {selectFilterBy === 'custom_range' && (
          <div className="h-fit w-max p-3">
            <div className="flex justify-center gap-x-1">
              <Input
                isShowPlacehoder
                placeholder="Start date"
                size="sm"
                className="w-40  border"
                inputClassName="text-sm leading-7"
              />
              <Input
                isShowPlacehoder
                placeholder="End date"
                size="sm"
                className="w-40  border"
                inputClassName="text-sm leading-7"
              />
            </div>
            <div className="mt-4 flex justify-end gap-x-1 border-t pt-3">
              <Button
                onClick={() => setSelectFilterBy('')}
                color="light"
                size="xs"
                className="w-28 bg-gray-100  py-2 text-xs text-gray-500 shadow-none  ring-1"
              >
                Cancel
              </Button>
              <Button color="gray" size="xs" className="w-28 py-2 text-xs  shadow-none ring-1">
                Apply
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterDatetime;
