import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';

interface HeaderNotificationTabItemProp {
  text: string;
  id: string | null;
  number: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const HeaderNotificationTabItem = ({
  text,
  id,
  number,
  isSelected,
  onSelect,
}: HeaderNotificationTabItemProp) => {
  const handleSelect = useCallback(() => {
    onSelect(id || '');
  }, [id, onSelect]);

  return (
    <div
      className={twMerge(
        'group -mb-px flex cursor-pointer items-center justify-center space-x-3 border-gray-100 pb-3 pt-3 font-semibold lg:pb-4 lg:pt-2',
        isSelected && 'border-primary-700',
      )}
      role="button"
      tabIndex={0}
      onClick={handleSelect}
    >
      <div
        className={twMerge('text-steal-700 group-hover:text-primary-700', isSelected && 'text-primary-700')}
      >
        {text}
      </div>
      <div
        className={twMerge(
          'rounded-md bg-gray-100 px-2 py-1 text-xs text-slate-700',
          isSelected && 'bg-primary-100 text-primary-700',
        )}
      >
        {number || 0}
      </div>
    </div>
  );
};

export default HeaderNotificationTabItem;
