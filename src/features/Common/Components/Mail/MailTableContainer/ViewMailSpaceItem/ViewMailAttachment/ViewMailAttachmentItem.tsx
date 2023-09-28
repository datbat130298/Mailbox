import axios from 'axios';
import fileDownload from 'js-file-download';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AttachmentType } from '../../../../../../../app/Types/commonTypes';
import AttachmentIconExtension from '../../../../ComposePopup/Components/Attachments/AttachmentIconExtension';
import FilePreviewModal from '../../../../FilePreview/FilePreviewModal';

interface ViewMailAttachmentItemProp {
  attachment: AttachmentType;
}

const ViewMailAttachmentItem = ({ attachment }: ViewMailAttachmentItemProp) => {
  const [isShowView, setIsShowView] = useState(false);

  const { t } = useTranslation();

  const sizeItem: string = useMemo(() => {
    if (attachment.file_size) {
      if (attachment.file_size >= 1000000000) {
        return `${Math.round(attachment.file_size / 1024 / 1024 / 1024)} GB`;
      }
      if (attachment.file_size >= 1000000) {
        return `${Math.round(attachment.file_size / 1024 / 1024)} MB`;
      }
      return `${Math.round(attachment.file_size / 1024)} KB`;
    }
    return '';
  }, [attachment.file_size]);

  const handleDownload = () => {
    if (!attachment.url) return;
    axios
      .get(attachment.url, { responseType: 'blob' })
      .then((res) => fileDownload(res.data, attachment.file_name));
  };

  const handleClickView = () => {
    setIsShowView(true);
  };

  const handleCloseView = () => {
    setIsShowView(false);
  };

  return (
    <>
      <div className="group relative flex h-16 w-64 gap-5 rounded-md bg-gray-200 hover:cursor-pointer">
        <div className="h-16 w-16 overflow-hidden rounded-md">
          {/* <img src={attachment.url} alt="attachment" className="h-full w-full object-cover" /> */}
          <AttachmentIconExtension attachment={attachment} classNameAll="p-3" />
        </div>
        <div className="absolute left-20 top-3 flex flex-1 flex-col items-start justify-center gap-0.5 overflow-hidden transition-all duration-300 group-hover:top-1">
          <p className="line-clamp-1 w-9/12 overflow-hidden text-ellipsis text-left text-sm text-gray-800">
            {attachment.file_name}
          </p>
          <p className="text-xs text-gray-500">{sizeItem}</p>
          <div className="flex items-center gap-4 opacity-0 transition-all duration-300 group-hover:h-fit group-hover:opacity-100">
            <div
              className="text-xs text-blue-700 hover:underline"
              onClick={handleDownload}
              tabIndex={0}
              role="button"
            >
              {t('download')}
            </div>
            <div
              className="text-xs text-blue-700 hover:underline"
              onClick={handleClickView}
              tabIndex={0}
              role="button"
            >
              {t('view')}
            </div>
          </div>
        </div>
      </div>
      <FilePreviewModal isOpen={isShowView} attachment={attachment} onClose={handleCloseView} />
    </>
  );
};

export default ViewMailAttachmentItem;
