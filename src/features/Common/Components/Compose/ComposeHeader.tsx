import { IoClose } from 'react-icons/io5';
import { MdMinimize } from 'react-icons/md';
import { VscChromeRestore } from 'react-icons/vsc';
import { twMerge } from 'tailwind-merge';

interface ComposeHeaderProps {
  onClose: () => void;
  onRestore?: () => void;
  onCollect?: () => void;
  title?: string;
  className?: string;
}

const ComposeHeader = ({ className, onClose, onRestore, onCollect, title }: ComposeHeaderProps) => {
  return (
    <div className={twMerge('rounded-t-md bg-[#F2F6FC]', className)}>
      <div className="relative flex w-full justify-between p-2 px-2 py-2">
        <div className="pl-2 text-sm font-semibold">{title || 'New Mail'}</div>
        <div className="absolute right-3 top-[5px] flex items-center">
          <div className="-mt-1 p-0.5 hover:bg-slate-200" role="button" tabIndex={0} onClick={onCollect}>
            <MdMinimize size={18} />
          </div>
          <div className="p-0.5 hover:bg-slate-200" role="button" tabIndex={0} onClick={onRestore}>
            <VscChromeRestore size={15} />
          </div>
          <div className="mt-0.5 p-0.5 hover:bg-slate-200" role="button" tabIndex={0} onClick={onClose}>
            <IoClose size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ComposeHeader;
