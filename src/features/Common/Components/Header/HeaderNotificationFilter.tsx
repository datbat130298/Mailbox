/* eslint-disable @typescript-eslint/no-explicit-any */
import { capitalize } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiChevronDown } from 'react-icons/bi';
import { HiOutlineFilter } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { getNotificationCategories } from '../../../../app/Services/User/MyNotificationServiceCategories';
import HeaderNotificationFilterItem from './HeaderNotificationFilterItem';

interface HeaderNotificationFilterProp {
  onChange: (data: any) => void;
}

const HeaderNotificationFilter = ({ onChange }: HeaderNotificationFilterProp) => {
  const { t } = useTranslation();

  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [availableFilter, setAvailableFilter] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  const getData = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await getNotificationCategories();

      setAvailableFilter(['all', ...data]);
    } catch (error) {
      setAvailableFilter([]);
    } finally {
      setIsLoading(false);
    }
  }, [getNotificationCategories]);

  const handleFocusButton = useCallback(() => {
    setIsShowDropdown(true);
  }, []);

  const handleBlurButton = useCallback(() => {
    setIsShowDropdown(false);
  }, []);

  const handleSelectFilter = useCallback((data: any) => {
    const newData = data === 'all' || data === 'All' ? null : data;

    setSelectedFilter(newData);
    setIsShowDropdown(false);
    onChange(newData);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="relative z-10">
      <button
        type="button"
        className={twMerge(
          'flex h-10 cursor-pointer items-center space-x-2 rounded-md border-2 border-white bg-white pl-3 pr-2 duration-100 hover:bg-gray-50 sm:border-gray-100',
          // isShowDropdown && get("dropdown.selected")
        )}
        onFocus={handleFocusButton}
        onBlur={handleBlurButton}
      >
        <HiOutlineFilter className="mr-0.5" />
        <span className="text-sm">{selectedFilter ? capitalize(selectedFilter) : t('all')}</span>
        <BiChevronDown size={18} />
      </button>
      <div
        className={twMerge(
          'absolute right-0 top-12 hidden min-w-[128px] rounded-md border-2 border-gray-100 bg-white py-2 text-slate-700 shadow-sm transition duration-100 ease-linear',
          isShowDropdown && 'block',
        )}
      >
        {isLoading && (
          <div className="flex h-48 w-full items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-700 border-t-transparent" />
          </div>
        )}
        {!isLoading &&
          availableFilter.map((item: any) => (
            <HeaderNotificationFilterItem
              key={item.uuid}
              data={capitalize(item)}
              onSelect={handleSelectFilter}
            />
          ))}
      </div>
    </div>
  );
};

export default HeaderNotificationFilter;
