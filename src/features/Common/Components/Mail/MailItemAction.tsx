import { BsTrash } from 'react-icons/bs';
import { IoArchiveOutline, IoMailOpenOutline } from 'react-icons/io5';
import Tooltip from '../Tooltip/Tooltip';

const MailItemAction = () => {
  return (
    <div className="absolute right-0 top-0 z-10  hidden h-13 w-40 justify-center bg-gray-100 text-gray-500 group-hover:block">
      <div className="flex h-full w-full justify-center gap-x-1 pr-2">
        <Tooltip title="Archive" position="bottom">
          <div className="flex-center h-full w-fit">
            <div className="flex-center h-10 w-10 rounded-full hover:bg-gray-200 hover:text-primary-700">
              <IoArchiveOutline size={16} />
            </div>
          </div>
        </Tooltip>
        <Tooltip title="Trash" position="bottom">
          <div className="flex-center h-full w-fit">
            <div className="flex-center h-10 w-10 rounded-full hover:bg-gray-200  hover:text-primary-700">
              <BsTrash size={15} />
            </div>
          </div>
        </Tooltip>
        <Tooltip title="Mask as read" position="bottom">
          <div className="flex-center h-full w-fit">
            <div className="flex-center h-10 w-10 rounded-full hover:bg-gray-200  hover:text-primary-700">
              <IoMailOpenOutline size={16} />
            </div>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};
export default MailItemAction;
