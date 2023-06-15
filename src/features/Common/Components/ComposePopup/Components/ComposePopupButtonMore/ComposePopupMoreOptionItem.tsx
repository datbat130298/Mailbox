import { MouseEvent, useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';
import LabelPopup from './LabelPopup';

interface ItemOption {
  id: number;
  label: string;
  isActive?: number;
}

interface ComposePopupMoreOptionItemProps {
  item: ItemOption;
  className: string;
  onClick: () => void;
  isActiveFormat?: boolean;
}

const ComposePopupMoreOptionItem = ({
  item,
  onClick,
  className,
  isActiveFormat,
}: ComposePopupMoreOptionItemProps) => {
  const [isShowPopupLabel, setIsShowPopupLabel] = useState<boolean>(false);

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

  const handleMoveSelect = () => {
    if (item.id === 4) {
      setIsShowPopupLabel(true);
    }
  };
  return (
    <>
      <div
        className={twMerge(
          'relative flex items-center gap-1 px-2 py-1 text-sm  text-slate-700 hover:bg-slate-200',
          className,
          item.id === 1 && 'border-b border-slate-200',
          item.id === 6 && 'border-t border-slate-200',
        )}
        role="button"
        tabIndex={0}
        onClick={(e) => handleClick(e)}
        onMouseMove={() => handleMoveSelect()}
        onMouseLeave={() => setIsShowPopupLabel(false)}
      >
        <div
          className={twMerge(
            'invisible px-2 text-black',
            localStorage.getItem('defaultFullScreen') === 'true' && item.id === 1 && 'visible',
            isActiveFormat && item.id === 2 && 'visible',
          )}
        >
          <FiCheck size={18} />
        </div>
        <div className="pr-5 text-left">{item.label}</div>
      </div>
      {isShowPopupLabel && <LabelPopup handleMoveSelect={handleMoveSelect} />}
    </>
  );
};

export default ComposePopupMoreOptionItem;
