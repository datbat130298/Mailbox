import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';

const Pagination = () => {
  return (
    <div className="flex h-full w-fit text-gray-500">
      <div className="flex-center my-3 flex h-8 w-max rounded-md p-2 text-sm hover:bg-gray-100">
        View 1-50 of 200
      </div>
      <div className="my-3 flex h-8 w-fit rounded-md">
        <div className="flex-center h-8 w-8  rounded-full hover:bg-gray-100 hover:text-primary-700">
          <MdOutlineKeyboardArrowLeft />
        </div>
        <div className=" flex-center h-8 w-8 rounded-full hover:bg-gray-100 hover:text-primary-700">
          <MdOutlineKeyboardArrowRight />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
