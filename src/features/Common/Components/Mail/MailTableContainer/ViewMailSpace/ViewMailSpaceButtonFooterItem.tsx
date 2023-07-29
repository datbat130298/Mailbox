import { GoDotFill } from 'react-icons/go';
import { twMerge } from 'tailwind-merge';

interface ViewMailSpaceButtonFooterItemProp {
  title: string;
  onClick: () => void;
  className?: string;
}

const ViewMailSpaceButtonFooterItem = ({ title, onClick, className }: ViewMailSpaceButtonFooterItemProp) => {
  return (
    <div
      className={twMerge(
        'flex h-9 items-center justify-start rounded-lg px-2 text-sm hover:cursor-pointer hover:bg-gray-100',
        className,
      )}
      tabIndex={0}
      role="button"
      onClick={onClick}
    >
      <GoDotFill size={10} className="mr-1.5 mt-0.5 text-gray-400" /> {title}
    </div>
  );
};

export default ViewMailSpaceButtonFooterItem;
