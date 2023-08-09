/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

interface HeaderNotificationFilterItemProp {
  data: any;
  onSelect: (data: any) => void;
}

const HeaderNotificationFilterItem = ({ data, onSelect }: HeaderNotificationFilterItemProp) => {
  const handleClick = useCallback(() => {
    onSelect(data);
  }, [data, onSelect]);

  return (
    <div
      className={twMerge('cursor-pointer px-4 py-1 hover:bg-gray-100')}
      role="button"
      tabIndex={0}
      onMouseDown={handleClick}
    >
      {data}
    </div>
  );
};

export default HeaderNotificationFilterItem;
