import { DefaultTFuncReturn } from 'i18next';
import { cloneElement, ReactElement, useEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import { triggerClickOutside } from '../../../utils/helpers';

interface FilterItemType {
  uuid: number;
  label: string;
  value: string;
  onClick?: () => void;
}

interface FilterDropdownProps {
  data: Array<FilterItemType>;
  position: string;
  elementStyle?: ReactElement;
  icon?: React.ReactNode;
  label?: DefaultTFuncReturn;
  className?: string;
}

const FilterDropdown = ({ data, position, elementStyle, icon, label, className }: FilterDropdownProps) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const [isShowFilterDropdown, setIsShowFilterDropdown] = useState(false);
  const [selectFilterBy, setSelectFilterBy] = useState('');

  useEffect(() => {
    triggerClickOutside(filterRef, () => setIsShowFilterDropdown(false));
  }, [filterRef, triggerClickOutside]);
  return (
    <div className="relative" ref={filterRef}>
      {elementStyle && (
        <div className={twMerge('group flex h-full w-fit')}>
          {cloneElement(elementStyle, {
            onClick: () => {
              setIsShowFilterDropdown(true);
            },
          })}
          <div
            className={twMerge(
              'flex-center ml-1 h-full w-max hover:text-primary-700  group-hover:text-primary-700',
              isShowFilterDropdown && ' text-primary-700',
            )}
            role="button"
            tabIndex={0}
            onClick={() => {
              setIsShowFilterDropdown(true);
            }}
          >
            <FiChevronDown size={14} />
          </div>
        </div>
      )}
      {!elementStyle && (
        <div
          className={twMerge(
            'my-3 flex h-8 w-fit rounded-md px-2  hover:bg-gray-100 hover:text-primary-700',
            isShowFilterDropdown && 'bg-gray-100 text-primary-700',
            className,
          )}
          role="button"
          tabIndex={0}
          onClick={() => {
            setIsShowFilterDropdown(true);
          }}
        >
          <div className="flex-center h-full w-max">{icon}</div>
          <div className="ml-1 text-sm leading-8">{label}</div>
        </div>
      )}
      <div
        className={twMerge(
          'absolute z-50 hidden h-fit w-fit rounded-md bg-white p-1 text-gray-700 shadow-box',
          position,
          isShowFilterDropdown && 'block',
        )}
      >
        {data?.map((item) => (
          <div
            className={twMerge(
              'flex h-8 min-w-max rounded-sm hover:bg-gray-200 hover:text-primary-700',
              selectFilterBy === item?.value && 'bg-gray-200 text-primary-700',
            )}
            key={item.uuid}
            role="button"
            tabIndex={0}
            onClick={() => {
              if (item.onClick) {
                item.onClick();
              }
              setSelectFilterBy(item.value);
              setIsShowFilterDropdown(false);
            }}
          >
            <div className="h-full w-full px-7 text-start text-sm leading-8">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterDropdown;
