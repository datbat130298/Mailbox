import { twMerge } from 'tailwind-merge';

const HeaderNotificationDropdownSkeleton = () => {
  return (
    <div className="flex flex-col space-y-6 px-3 py-3">
      <div className="flex items-center space-x-6">
        <div className={twMerge('h-16 w-16 animate-pulse rounded-full bg-gray-100')} />
        <div className="flex flex-1 flex-col space-y-4">
          <div className={twMerge('h-4 w-full animate-pulse rounded-md bg-gray-100')} />
          <div className={twMerge('h-4 w-1/3 animate-pulse rounded-md bg-gray-100')} />
        </div>
      </div>
    </div>
  );
};

export default HeaderNotificationDropdownSkeleton;
