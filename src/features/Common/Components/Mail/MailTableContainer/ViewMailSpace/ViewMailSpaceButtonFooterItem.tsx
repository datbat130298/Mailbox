import { GoDotFill } from 'react-icons/go';

interface ViewMailSpaceButtonFooterItemProp {
  title: string;
}

const ViewMailSpaceButtonFooterItem = ({ title }: ViewMailSpaceButtonFooterItemProp) => {
  return (
    <div className="flex h-9 items-center justify-start rounded-lg px-2 text-sm hover:cursor-pointer hover:bg-gray-100">
      <GoDotFill size={10} className="mr-1.5 mt-0.5 text-gray-400" /> {title}
    </div>
  );
};

export default ViewMailSpaceButtonFooterItem;
