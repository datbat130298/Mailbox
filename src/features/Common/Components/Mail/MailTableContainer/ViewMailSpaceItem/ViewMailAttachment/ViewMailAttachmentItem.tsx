import axios from 'axios';
import fileDownload from 'js-file-download';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AttachmentIconExtension from '../../../../ComposePopup/Components/Attachments/AttachmentIconExtension';
import FilePreviewModal from '../../../../FilePreview/FilePreviewModal';
import { AttachmentType } from './ViewMailAttachments';

interface ViewMailAttachmentItemProp {
  attachment: AttachmentType;
}

const ViewMailAttachmentItem = ({ attachment }: ViewMailAttachmentItemProp) => {
  const [isShowView, setIsShowView] = useState(false);

  const { t } = useTranslation();

  const sizeItem: string = useMemo(() => {
    if (attachment.size) {
      if (attachment.size >= 1000000000) {
        return `${Math.round(attachment.size / 1024 / 1024 / 1024)} GB`;
      }
      if (attachment.size >= 1000000) {
        return `${Math.round(attachment.size / 1024 / 1024)} MB`;
      }
      return `${Math.round(attachment.size / 1024)} KB`;
    }
    return '';
  }, [attachment.size]);

  const handleDownload = () => {
    if (!attachment.absolute_slug) return;
    axios
      .get(attachment.absolute_slug, { responseType: 'blob' })
      .then((res) => fileDownload(res.data, attachment.name));
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
          {/* <img src={attachment.absolute_slug} alt="attachment" className="h-full w-full object-cover" /> */}
          <AttachmentIconExtension attachment={attachment} classNameAll="p-3" />
        </div>
        <div className="absolute left-20 top-3 flex flex-1 flex-col items-start justify-center gap-0.5 transition-all duration-300 group-hover:top-1">
          <p className="text-sm text-gray-800">{attachment.name}</p>
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
