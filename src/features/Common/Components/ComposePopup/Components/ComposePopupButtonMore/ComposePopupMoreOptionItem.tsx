import { MouseEvent } from 'react';
import { FiCheck } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

interface ItemOption {
  id: number;
  label: string;
  isActive?: number;
}

interface ComposePopupMoreOptionItemProps {
  item: ItemOption;
  className: string;
  onClick: () => void;
}

const ComposePopupMoreOptionItem = ({ item, onClick, className }: ComposePopupMoreOptionItemProps) => {
  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    onClick();
    if ('isActive' in item && item.isActive === 0) {
      // eslint-disable-next-line no-param-reassign
      item.isActive = 1;
    } else if ('isActive' in item && item.isActive === 1) {
      // eslint-disable-next-line no-param-reassign
      item.isActive = 0;
    }
  };

  return (
    <div
      className={twMerge(
        'flex items-center gap-1 px-2 py-1 text-sm text-slate-700  hover:bg-slate-200',
        className,
        item.id === 1 && 'border-b border-slate-200',
        item.id === 6 && 'border-t border-slate-200',
      )}
      role="button"
      tabIndex={0}
      onClick={(e) => handleClick(e)}
    >
      <div
        className={twMerge(
          'invisible px-2 text-black',
          localStorage.getItem('defaultFullScreen') === 'true' && item.id === 1 && 'visible',
        )}
      >
        <FiCheck size={18} />
      </div>
      <div className="pr-5 text-left">{item.label}</div>
    </div>
  );
};

export default ComposePopupMoreOptionItem;
