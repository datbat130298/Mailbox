import axios from 'axios';
import fileDownload from 'js-file-download';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import AttachmentIconExtension from './AttachmentIconExtension';
import { FileLoadedType } from './AttachmentsModal';

interface FileItemProp {
  file: File | FileLoadedType;
  onRemoveFile: (index: string) => void;
  index: string;
  src?: string;
}

const FileItem = ({ file, onRemoveFile, index, src }: FileItemProp) => {
  const { t } = useTranslation();
  const handleRemove = () => {
    onRemoveFile(index);
  };

  const handleDownload = () => {
    if (!src) return;
    axios.get(src, { responseType: 'blob' }).then((res) => fileDownload(res.data, 'Datbat'));
  };

  const size: string = useMemo(() => {
    if (file) {
      if (file.size >= 1000000000) {
        return `${Math.round(file.size / 1024 / 1024 / 1024)} GB`;
      }
      if (file.size >= 1000000) {
        return `${Math.round(file.size / 1024 / 1024)} MB`;
      }
      return `${Math.round(file.size / 1024)} KB`;
    }
    return '';
  }, [file]);

  const fileName = useMemo(() => {
    if (file) {
      if (file instanceof File) {
        return file.name;
      }
      return file.file_name;
    }
    return '';
  }, [file]);

  return (
    <div className="flex h-13 w-full items-center gap-2 border-b border-gray-200 px-2 hover:bg-gray-100">
      <div className="flex h-10 w-16 items-center justify-center overflow-hidden rounded-lg">
        {/* <img src={file ? URL.createObjectURL(file) : src} className="" alt="Img" /> */}
        <AttachmentIconExtension attachment={file as File} />
      </div>
      <div className="flex flex-1 flex-col justify-between">
        <p className="line-clamp-1 overflow-hidden rounded-lg px-2 text-base text-gray-800">{fileName}</p>
        <div className="item-center flex justify-start gap-3">
          <div
            className={twMerge(
              'rounded-md px-2 py-0.5 text-sm text-gray-500 hover:cursor-default',
              src && ' hover:cursor-pointer  hover:bg-gray-50 hover:text-gray-800 hover:shadow-md',
            )}
            tabIndex={0}
            role="button"
            onClick={handleDownload}
          >
            {t('download')}
          </div>
          <div
            className="rounded-md px-2 py-0.5 text-sm text-gray-500   hover:bg-gray-50 hover:text-gray-800 hover:shadow-md"
            tabIndex={0}
            role="button"
            onClick={handleRemove}
          >
            {t('remove')}
          </div>
        </div>
      </div>
      <div
        className={twMerge(
          'hidden rounded-md border border-blue-600 px-2 py-0.5 text-xs font-semibold text-gray-600',
          src && 'block',
        )}
      >
        {t('uploaded')}
      </div>
      <div className="flex w-14 items-center justify-end text-xs text-gray-400">{`${size}`}</div>
    </div>
  );
};

export default FileItem;
