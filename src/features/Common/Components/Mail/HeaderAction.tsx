import { BsTrash } from 'react-icons/bs';
import { IoArchiveOutline } from 'react-icons/io5';
import { MdOutlineMoreVert, MdOutlineReport } from 'react-icons/md';
import { moreAction } from '../../../utils/helpers';
import FilterDropdown from '../FilterDropdown/FilterDropdown';

interface HeaderActionProps {
  showAction: boolean;
}

const HeaderAction = ({ showAction }: HeaderActionProps) => {
  return (
    <>
      {showAction && (
        <>
          <div className="my-3 ml-1 flex h-8 w-fit rounded-md px-2  hover:bg-gray-100 hover:text-primary-700">
            <div className="flex-center h-full w-max">
              <IoArchiveOutline size={15} />
            </div>
            <div className="ml-1 text-sm leading-8">Archive</div>
          </div>
          <div className="my-3 ml-1 flex h-8 w-fit rounded-md px-2  hover:bg-gray-100 hover:text-primary-700">
            <div className="flex-center h-full w-max">
              <BsTrash size={14} />
            </div>
            <div className="ml-1 text-sm leading-8">Delete</div>
          </div>
          <div className="my-3 ml-1 flex h-8 w-fit rounded-md px-2  hover:bg-gray-100 hover:text-primary-700">
            <div className="flex-center h-full w-max">
              <MdOutlineReport size={18} />
            </div>
            <div className="ml-1 text-sm leading-8">Report</div>
          </div>
        </>
      )}
      <div className="-ml-1">
        <FilterDropdown
          data={moreAction}
          icon={<MdOutlineMoreVert size={18} />}
          label="More"
          position="left-0 top-[52px]"
        />
      </div>
    </>
  );
};

export default HeaderAction;
