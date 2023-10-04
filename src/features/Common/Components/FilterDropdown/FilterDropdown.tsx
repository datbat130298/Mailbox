import { DefaultTFuncReturn } from 'i18next';
import { nanoid } from 'nanoid';
import React, { cloneElement, ReactElement, useEffect, useRef, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import { TypeChat } from '../../../../app/Enums/commonEnums';
import { triggerClickOutside } from '../../../utils/helpers';
import FilterDropdownItem from './FilterDropDownItem';

export interface FilterItemType {
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
  type?: TypeChat;
}

const FilterDropdown = ({
  data,
  position,
  elementStyle,
  icon,
  label,
  className,
  type,
}: FilterDropdownProps) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const [isShowFilterDropdown, setIsShowFilterDropdown] = useState(false);

  useEffect(() => {
    triggerClickOutside(filterRef, () => setIsShowFilterDropdown(false));
  }, [filterRef, triggerClickOutside]);

  const handleClose = () => {
    setIsShowFilterDropdown(false);
  };

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
            className={twMerge('flex-center ml-1.5 h-full w-max ', isShowFilterDropdown && '')}
            role="button"
            tabIndex={0}
            onClick={() => {
              setIsShowFilterDropdown(true);
            }}
          >
            <FiChevronDown size={17} />
          </div>
        </div>
      )}
      {!elementStyle && (
        <div
          className={twMerge(
            'my-3 flex h-8 w-fit rounded-md bg-[#F5F6F8] px-3 hover:bg-[#ececee]',
            isShowFilterDropdown && 'bg-[#ececee]',
            className,
          )}
          role="button"
          tabIndex={0}
          onClick={() => {
            setIsShowFilterDropdown(true);
          }}
        >
          <div className="flex-center h-full w-max">{icon}</div>
          <div className="ml-1 hidden text-sm leading-8 md:block">{label}</div>
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
          <FilterDropdownItem item={item} key={nanoid()} onClose={handleClose} type={type} />
        ))}
      </div>
    </div>
  );
};

export default React.forwardRef(FilterDropdown);
