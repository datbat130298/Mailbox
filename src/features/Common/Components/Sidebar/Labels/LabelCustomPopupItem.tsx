import { useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { twMerge } from 'tailwind-merge';

interface LabelCustomPopupItemProp {
  onClick: () => void;
  className?: string;
  title: string;
  id: number;
  isShowCheck?: boolean;
}

const LabelCustomPopupItem = ({
  onClick,
  className,
  title,
  id,
  isShowCheck = true,
}: LabelCustomPopupItemProp) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleClick = () => {
    setIsActive((prev) => !prev);
    onClick();
  };

  return (
    <div
      className={twMerge(
        'flex w-full items-center gap-1.5 py-1 pl-2.5 text-sm hover:bg-slate-100',
        className,
      )}
      id={id.toString()}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      {isShowCheck && <FiCheck size={18} className={twMerge('opacity-0', isActive && 'opacity-1')} />}

      {title}
    </div>
  );
};

export default LabelCustomPopupItem;
