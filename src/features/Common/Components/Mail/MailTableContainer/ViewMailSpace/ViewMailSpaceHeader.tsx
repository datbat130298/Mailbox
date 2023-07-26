import { useTranslation } from 'react-i18next';
import { AiOutlineLink } from 'react-icons/ai';
import { BsCheck } from 'react-icons/bs';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { IoMdAlarm } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { MdOutlineWatchLater } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import Tooltip from '../../../Tooltip/Tooltip';

interface ViewMailSpaceHeaderProp {
  handleClose: () => void;
}

const ViewMailSpaceHeader = ({ handleClose }: ViewMailSpaceHeaderProp) => {
  const { t } = useTranslation();

  return (
    <div className="">
      <div
        className={twMerge(
          'flex h-14 w-full items-center justify-between border-b-[0.5px] px-3 text-base text-gray-700',
        )}
      >
        <div className="flex items-center justify-start gap-1">
          <div className="flex items-center gap-1 rounded-lg px-2 py-0.5 hover:cursor-pointer hover:bg-slate-100 hover:text-primary-500">
            <IoMdAlarm />
            <p className="text-sm leading-8">Reminder</p>
          </div>
          <div className="flex items-center gap-1 rounded-lg px-2 py-0.5 hover:cursor-pointer hover:bg-slate-100 hover:text-primary-500">
            <BsCheck />
            <p className="text-sm leading-8">Add task</p>
          </div>
          <div className="flex items-center gap-1 rounded-lg px-2 py-0.5 hover:cursor-pointer hover:bg-slate-100 hover:text-primary-500">
            <AiOutlineLink />
            <p className="text-sm leading-8">Permalink</p>
          </div>
          <div className="flex items-center gap-1 rounded-lg px-2 py-0.5 hover:cursor-pointer hover:bg-slate-100 hover:text-primary-500">
            <MdOutlineWatchLater />
            <p className="text-sm leading-8">Snooze</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Tooltip title={t('popup')} position="bottom">
            <div className="flex h-7 w-7 justify-center rounded-lg text-gray-500 hover:cursor-pointer hover:bg-slate-100">
              <HiOutlineArrowRight className="mt-1 -rotate-45" size={17} />
            </div>
          </Tooltip>
          <Tooltip title={t('close')} position="bottom">
            <div
              className="flex h-7 w-7 justify-center rounded-lg text-gray-500 hover:cursor-pointer hover:bg-slate-100"
              tabIndex={0}
              role="button"
              onClick={handleClose}
            >
              <IoClose className="mt-[3px]" size={20} />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ViewMailSpaceHeader;
