import { useTranslation } from 'react-i18next';
import { IoClose } from 'react-icons/io5';
import { MdMinimize } from 'react-icons/md';
import { VscChromeRestore } from 'react-icons/vsc';
import { twMerge } from 'tailwind-merge';
import Tooltip from '../../Tooltip/Tooltip';

interface ComposePopupHeaderProps {
  onClose: (isSave?: boolean) => void;
  onChangeViewType: (e: React.MouseEvent) => void;
  onZoom: (e: React.MouseEvent) => void;
  title?: string;
  className?: string;
}

const ComposePopupHeader = ({
  className,
  onClose,
  onChangeViewType,
  onZoom,
  title,
}: ComposePopupHeaderProps) => {
  const { t } = useTranslation();
  return (
    <div
      className={twMerge('z-50  rounded-t-md bg-[#F2F6FC]', className)}
      role="button"
      onClick={(e) => onZoom(e)}
      tabIndex={0}
    >
      <div className="relative flex w-full justify-between p-2 px-2 py-2">
        <div className="line-clamp-1 w-[calc(100%-68px)] text-ellipsis break-all pl-2 text-sm font-semibold">
          {title || t('new_message')}
        </div>
        <div className="absolute right-3 top-[8px] flex items-center gap-x-1">
          <Tooltip title={t('minimize')} position="left">
            <div
              className="h-[15px] w-[18px] hover:bg-slate-200"
              role="button"
              tabIndex={0}
              onClick={(e) => onZoom(e)}
            >
              <MdMinimize size={18} className="absolute -bottom-[1px]" />
            </div>
          </Tooltip>
          <Tooltip title={t('full_screen')} position="left">
            <div
              className="relative h-[15px] w-[18px] hover:bg-slate-200"
              role="button"
              tabIndex={0}
              onClick={(e: React.MouseEvent) => onChangeViewType(e)}
            >
              <VscChromeRestore size={15} className="absolute -bottom-0.5 left-0.5 p-[1px]" />
            </div>
          </Tooltip>
          <Tooltip title={t('save_close')} position="left">
            <div
              className="h-[15px] w-[18px] hover:bg-slate-200"
              role="button"
              tabIndex={0}
              onClick={() => {
                onClose(false);
              }}
            >
              <IoClose size={18} className="p-[1px]" />
            </div>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};
export default ComposePopupHeader;
