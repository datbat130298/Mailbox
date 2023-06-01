import { twMerge } from 'tailwind-merge';
import Tooltip from '../../Tooltip/Tooltip';

interface ComposePopupToolbarItemProps {
  icon: React.ReactNode;
  onClick: () => void;
  title: string | '';
  isActive?: boolean;
  className?: string;
}

const ComposePopupToolbarItem = ({
  icon,
  onClick,
  title,
  isActive,
  className,
}: ComposePopupToolbarItemProps) => {
  return (
    <Tooltip title={title} position="top">
      <div
        className={twMerge(
          'mx-0.5 flex h-7 w-7 items-center rounded-sm pl-1 hover:bg-gray-100',
          isActive && 'bg-gray-200',
          className,
        )}
        onClick={onClick}
        role="button"
        tabIndex={0}
      >
        {icon}
      </div>
    </Tooltip>
  );
};

export default ComposePopupToolbarItem;
