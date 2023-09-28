import { useMemo } from 'react';
import { IoClose } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import AttachmentIconExtension from '../../Components/ComposePopup/Components/Attachments/AttachmentIconExtension';

interface FileItemMobileProp {
  file: File;
  onRemove: (id: string) => void;
  id: string;
}

const FileItemMobile = ({ file, onRemove, id }: FileItemMobileProp) => {
  // const { t } = useTranslation();
  const sizeItem: string = useMemo(() => {
    if (file.size) {
      if (file.size >= 1000000000) {
        return `${Math.round(file.size / 1024 / 1024 / 1024)} GB`;
      }
      if (file.size >= 1000000) {
        return `${Math.round(file.size / 1024 / 1024)} MB`;
      }
      return `${Math.round(file.size / 1024)} KB`;
    }
    return '';
  }, [file.size]);

  return (
    <div className="relative h-24 w-full">
      <div className="relative h-full w-full overflow-hidden rounded-sm">
        <AttachmentIconExtension attachment={file} />
        <div className="absolute bottom-0 flex w-full items-center justify-between bg-white px-1 opacity-80">
          <div className="flex flex-1 flex-col justify-center">
            <p className="line-clamp-1 truncate text-xs font-semibold text-gray-900">{file.name}</p>
            <p className="line-clamp-1 truncate text-[10px] text-gray-500">{sizeItem}</p>
          </div>
          <div
            className={twMerge('relative flex h-5 w-5 items-center justify-center rounded-full')}
            role="button"
            tabIndex={0}
            onClick={() => onRemove(id)}
          >
            <IoClose />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileItemMobile;
