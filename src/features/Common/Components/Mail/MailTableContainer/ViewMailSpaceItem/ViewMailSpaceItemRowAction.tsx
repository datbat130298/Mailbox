import { useTranslation } from 'react-i18next';
import { CgMailForward } from 'react-icons/cg';
import { LuReply } from 'react-icons/lu';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import Tooltip from '../../../Tooltip/Tooltip';

interface ViewMailSpaceItemRowActionProp {
  isActive: boolean;
  isOpen: boolean;
  onClickReply: (e: React.MouseEvent) => void;
  onClickForward: (e: React.MouseEvent) => void;
}

const ViewMailSpaceItemRowAction = ({
  isActive,
  isOpen,
  onClickReply,
  onClickForward,
}: ViewMailSpaceItemRowActionProp) => {
  const { t } = useTranslation();

  return (
    <div className={twMerge('hidden group-hover:block', isActive && !isOpen && 'block')}>
      <div className="flex items-center gap-0.5">
        <Tooltip position="bottom" title={t('reply')}>
          <div
            className="flex h-5 w-5 items-center justify-center rounded-sm hover:bg-slate-100"
            onClick={onClickReply}
            tabIndex={0}
            role="button"
          >
            <LuReply size={16} className=" text-gray-500" />
          </div>
        </Tooltip>
        {/* <Tooltip position="bottom" title={t('reply_all')}>
          <div
            className="flex h-5 w-5 items-center justify-center rounded-sm hover:bg-slate-100"
            onClick={onClickReply}
            tabIndex={0}
            role="button"
          >
            <LuReplyAll size={16} className=" text-gray-500" />
          </div>
        </Tooltip> */}
        <Tooltip position="bottom" title={t('forward')}>
          <div
            className="flex h-5 w-5 items-center justify-center rounded-sm hover:bg-slate-100"
            role="button"
            tabIndex={0}
            onClick={onClickForward}
          >
            <CgMailForward size={16} className=" text-gray-500" />
          </div>
        </Tooltip>
        {/* <Tooltip position="bottom" title={t('reply')}>
          <div className="flex h-5 w-5 items-center justify-center rounded-sm hover:bg-slate-100">
            <BiLink size={15} className="  text-gray-500" />
          </div>
        </Tooltip> */}
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
