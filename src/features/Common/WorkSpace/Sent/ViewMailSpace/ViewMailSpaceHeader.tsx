import { AiOutlineLink } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { IoMdAlarm } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { MdOutlineWatchLater } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

interface ViewMailSpaceHeaderProp {
  handleClose: () => void;
}

const ViewMailSpaceHeader = ({ handleClose }: ViewMailSpaceHeaderProp) => {
  return (
    <div className="">
      <div
        className={twMerge(
          'ml-1 flex h-14 w-full items-center justify-between border-b-[0.5px] px-4 text-base text-gray-700',
        )}
      >
        <div className="flex items-center justify-start gap-1">
          <div className="flex items-center gap-1 rounded-sm px-2 py-0.5 hover:cursor-pointer hover:bg-slate-100 hover:text-black">
            <IoMdAlarm />
            <p className="text-sm leading-8">Reminder</p>
          </div>
          <div className="flex items-center gap-1 rounded-sm px-2 py-0.5 hover:cursor-pointer hover:bg-slate-100 hover:text-black">
            <BsCheck />
            <p className="text-sm leading-8">Add task</p>
          </div>
          <div className="flex items-center gap-1 rounded-sm px-2 py-0.5 hover:cursor-pointer hover:bg-slate-100 hover:text-black">
            <AiOutlineLink />
            <p className="text-sm leading-8">Permalink</p>
          </div>
          <div className="flex items-center gap-1 rounded-sm px-2 py-0.5 hover:cursor-pointer hover:bg-slate-100 hover:text-black">
            <MdOutlineWatchLater />
            <p className="text-sm leading-8">Snooze</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex h-7 w-7 justify-center rounded-lg text-gray-500 hover:cursor-pointer hover:bg-slate-100">
            <HiOutlineArrowRight className="mt-1 -rotate-45" size={17} />
          </div>
          <div
            className="flex h-7 w-7 justify-center rounded-lg text-gray-500 hover:cursor-pointer hover:bg-slate-100"
            tabIndex={0}
            role="button"
            onClick={handleClose}
          >
            <IoClose className="mt-[3px]" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMailSpaceHeader;
