import _ from 'lodash';
import { BsCheck } from 'react-icons/bs';
import { IoChevronForwardOutline } from 'react-icons/io5';
import { SelectOptionType } from '../../../../../app/Types/elementTypes';

interface FilePreviewVideoSettingItemprops {
  label: string | undefined;
  content?: string | number | undefined;
  icon?: React.ReactNode;
  selectedMenuItem?: SelectOptionType;
  onClick: () => void;
}

const FilePreviewVideoSettingItem = ({
  onClick,
  label,
  content,
  icon,
  selectedMenuItem,
}: FilePreviewVideoSettingItemprops) => {
  return (
    <div
      className="flex cursor-pointer items-center justify-between space-x-4 px-5 py-3 duration-75 hover:bg-gray-500/40"
      role="button"
      tabIndex={0}
      onClick={onClick}
    >
      <div className="flex flex-shrink-0 items-center justify-center">
        {icon}
        <span className="px-2 text-sm text-white">{label}</span>
      </div>

      {content && (
        <div className="flex flex-shrink-0 items-center justify-end overflow-hidden">
          <span className="mr-2 text-xs text-white">{content}</span>
          <IoChevronForwardOutline size={14} color="#FFFF" />
        </div>
      )}

      {_.includes(selectedMenuItem?.label, label) && <BsCheck size={20} color="#fff" />}
    </div>
  );
};

export default FilePreviewVideoSettingItem;
