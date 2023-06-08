import { twMerge } from 'tailwind-merge';
import Tooltip from '../../Tooltip/Tooltip';

interface ComposePopupToolbarItemProps {
  icon: React.ReactNode;
  onClick: () => void;
  title: string | '';
  isActive?: boolean;
  className?: string;
  id?: string;
}

const ComposePopupToolbarItem = ({
  icon,
  onClick,
  title,
  isActive,
  className,
  id,
}: ComposePopupToolbarItemProps) => {
  return (
    <div className="">
      <Tooltip title={title} position="top">
        <div
          id={id}
          className={twMerge(
            '-mb-2.5 -mr-1 flex h-8 w-8 items-center justify-center rounded-md hover:bg-gray-100',
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
    </div>
  );
};

export default ComposePopupToolbarItem;
