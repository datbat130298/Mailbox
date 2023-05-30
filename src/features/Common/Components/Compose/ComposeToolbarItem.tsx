import { twMerge } from 'tailwind-merge';
import Tooltip from '../Tooltip/Tooltip';

interface ComposeToolbarItemProps {
  icon: React.ReactNode;
  onClick: () => void;
  title: string | '';
  isActive?: boolean;
}

const ComposeToolbarItem = ({ icon, onClick, title, isActive }: ComposeToolbarItemProps) => {
  return (
    <Tooltip title={title} position="top">
      <div
        className={twMerge(
          'mx-0.5 flex h-7 w-7 items-center rounded-sm pl-1 hover:bg-gray-100',
          isActive && 'bg-gray-200',
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

export default ComposeToolbarItem;
