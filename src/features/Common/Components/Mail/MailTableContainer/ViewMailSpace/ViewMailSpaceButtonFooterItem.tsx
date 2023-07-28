import { GoDotFill } from 'react-icons/go';

interface ViewMailSpaceButtonFooterItemProp {
  title: string;
  onClick: () => void;
}

const ViewMailSpaceButtonFooterItem = ({ title, onClick }: ViewMailSpaceButtonFooterItemProp) => {
  return (
    <div
      className="flex h-9 items-center justify-start rounded-lg px-2 text-sm hover:cursor-pointer hover:bg-gray-100"
      tabIndex={0}
      role="button"
      onClick={onClick}
    >
      <GoDotFill size={10} className="mr-1.5 mt-0.5 text-gray-400" /> {title}
    </div>
  );
};

export default ViewMailSpaceButtonFooterItem;
