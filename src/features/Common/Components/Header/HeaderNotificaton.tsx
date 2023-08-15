import { useCallback, useEffect, useRef, useState } from 'react';
import { HiOutlineBell } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import { triggerClickOutside } from '../../../utils/helpers';
import HeaderNotificationDropdown from './HeaderNotificationDropdown';

const HeaderNotification = () => {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const containerRef = useRef(null);

  const handleClickTriggerButton = useCallback(() => {
    setIsShowDropdown((prev) => !prev);
  }, []);

  const handleClickOutside = useCallback(() => {
    setIsShowDropdown(false);
  }, []);

  useEffect(() => triggerClickOutside(containerRef, handleClickOutside), [handleClickOutside]);

  return (
    <div className="relative sm:block sm:px-1" ref={containerRef}>
      <div
        className={twMerge(
          'flex h-10 w-10 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100 lg:h-11 lg:w-11',
          isShowDropdown && 'bg-gray-100',
        )}
        role="button"
        tabIndex={0}
        onClick={handleClickTriggerButton}
      >
        <HiOutlineBell
          className={twMerge('text-slate-700', isShowDropdown && 'text-primary-700')}
          size={24}
        />
      </div>
      <span className="absolute left-0 top-1/2 hidden h-5 -translate-y-1/2 border-l-2 border-gray-100 sm:block" />
      <span className="absolute right-0 top-1/2 hidden h-5 -translate-y-1/2 border-l-2 border-gray-100 sm:block" />
      <HeaderNotificationDropdown isShow={isShowDropdown} onClose={handleClickOutside} />
    </div>
  );
};

export default HeaderNotification;
