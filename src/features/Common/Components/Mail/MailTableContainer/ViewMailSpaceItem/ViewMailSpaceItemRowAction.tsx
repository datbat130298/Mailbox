import { BiLink } from 'react-icons/bi';
import { CgMailForward } from 'react-icons/cg';
import { LuReply, LuReplyAll } from 'react-icons/lu';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import Tooltip from '../../../Tooltip/Tooltip';

interface ViewMailSpaceItemRowActionProp {
  isActive: boolean;
  isOpen: boolean;
  onClickReply: () => void;
  onClickForward: () => void;
}

const ViewMailSpaceItemRowAction = ({
  isActive,
  isOpen,
  onClickReply,
  onClickForward,
}: ViewMailSpaceItemRowActionProp) => {
  return (
    <div className={twMerge('hidden group-hover:block', isActive && !isOpen && 'block')}>
      <div className="flex items-center gap-0.5">
        <Tooltip position="bottom" title="reply">
          <div
            className="flex h-5 w-5 items-center justify-center rounded-sm hover:bg-slate-100"
            onClick={onClickReply}
            tabIndex={0}
            role="button"
          >
            <LuReply size={16} className=" text-gray-500" />
          </div>
        </Tooltip>
        <Tooltip position="bottom" title="forward">
          <div
            className="flex h-5 w-5 items-center justify-center rounded-sm hover:bg-slate-100"
            onClick={onClickForward}
            tabIndex={0}
            role="button"
          >
            <LuReplyAll size={16} className=" text-gray-500" />
          </div>
        </Tooltip>
        <Tooltip position="bottom" title="reply">
          <div className="flex h-5 w-5 items-center justify-center rounded-sm hover:bg-slate-100">
            <CgMailForward size={16} className=" text-gray-500" />
          </div>
        </Tooltip>
        <Tooltip position="bottom" title="reply">
          <div className="flex h-5 w-5 items-center justify-center rounded-sm hover:bg-slate-100">
            <BiLink size={15} className="  text-gray-500" />
          </div>
        </Tooltip>
        <span className="h-4 w-px bg-gray-300" />
        <Tooltip position="bottom" title="reply">
          <div className="flex h-5 w-5 items-center justify-center rounded-sm hover:bg-slate-100">
            <MdOutlineKeyboardArrowDown size={18} className=" text-gray-500" />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default ViewMailSpaceItemRowAction;
