import { GoDotFill } from 'react-icons/go';

const ViewMailSpaceGroupButtonFooter = () => {
  return (
    <div className="ml-3 flex h-12 items-center justify-start gap-2 text-blue-600">
      <div className="flex h-9 items-center justify-start rounded-lg px-2 text-sm hover:cursor-pointer hover:bg-gray-100">
        <GoDotFill size={10} className="mr-1.5 mt-0.5 text-gray-400" /> Reply
      </div>
      <div className="flex h-9 items-center justify-start rounded-lg px-2 text-sm hover:cursor-pointer hover:bg-gray-100">
        <GoDotFill size={10} className="mr-1.5 mt-0.5 text-gray-400" /> Reply All
      </div>
      <div className="flex h-9 items-center justify-start rounded-lg px-2 text-sm hover:cursor-pointer hover:bg-gray-100">
        <GoDotFill size={10} className="mr-1.5 mt-0.5 text-gray-400" /> Forward
      </div>
      <div className="flex h-9 items-center justify-start rounded-lg px-2 text-sm hover:cursor-pointer hover:bg-gray-100">
        <GoDotFill size={10} className="mr-1.5 mt-0.5 text-gray-400" /> Edit as new
      </div>
      <div className="flex h-9 items-center justify-start rounded-lg px-2 text-sm hover:cursor-pointer hover:bg-gray-100">
        <GoDotFill size={10} className="mr-1.5 mt-0.5 text-gray-400" /> Share Email
      </div>
    </div>
  );
};

export default ViewMailSpaceGroupButtonFooter;
