import axios from 'axios';
import fileDownload from 'js-file-download';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdMoreVert } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import { triggerClickOutside } from '../../../../../utils/helpers';
import AttachmentIconExtension from '../../../ComposePopup/Components/Attachments/AttachmentIconExtension';
import FilePreviewModal from '../../../FilePreview/FilePreviewModal';
import { AttachmentType } from '../ViewMailSpaceItem/ViewMailAttachment/ViewMailAttachments';

interface ViewMailAttachmentMobileItemProp {
  attachment: AttachmentType;
}

const ViewMailAttachmentMobileItem = ({ attachment }: ViewMailAttachmentMobileItemProp) => {
  const [isShowMore, setIsShowMore] = useState(false);
  const [isShowView, setIsShowView] = useState(false);

  const ref = useRef(null);
  const { t } = useTranslation();
  // const fileExtension = attachment.name.split('.').at(-1);

  // const isImg = useMemo(() => {
  //   if (_.values(ImageFileExtensionEnum).includes(fileExtension as ImageFileExtensionEnum)) return true;
  //   return false;
  // }, [fileExtension]);

  const handleClickMore = () => {
    setIsShowMore((prev) => !prev);
  };

  const handleClickView = () => {
    setIsShowView(true);
  };

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

  const handleCloseViewImg = () => {
    setIsShowView(false);
  };

  useEffect(() => {
    triggerClickOutside(ref, () => setIsShowMore(false));
  }, [ref, triggerClickOutside]);

  return (
    <div className="relative h-24 w-full" ref={ref}>
      <div className="relative h-full w-full overflow-hidden rounded-sm">
        <AttachmentIconExtension attachment={attachment} />
        <div className="absolute bottom-0 flex w-full items-center justify-between bg-white px-1 opacity-80">
          <div className="flex flex-1 flex-col justify-center">
            <p className="line-clamp-1 truncate text-xs font-semibold text-gray-900">{attachment.name}</p>
            <p className="line-clamp-1 truncate text-[10px] text-gray-500">{sizeItem}</p>
          </div>
          <div
            className={twMerge(
              'relative flex h-5 w-5 items-center justify-center rounded-full',
              isShowMore && 'bg-slate-200 shadow-lg',
            )}
            role="button"
            tabIndex={0}
            onClick={handleClickMore}
          >
            <MdMoreVert />
          </div>
        </div>
      </div>
      {isShowMore && (
        <div className="absolute right-5 top-[52px] z-50 rounded-sm bg-white py-0.5 text-xs shadow-md">
          <div role="button" tabIndex={0} onClick={handleClickView} className="px-3 py-0.5">
            {t('view')}
          </div>
          <div role="button" tabIndex={0} onClick={handleDownload} className="px-3 py-0.5">
            {t('download')}
          </div>
        </div>
      )}
      <FilePreviewModal attachment={attachment} isOpen={isShowView} onClose={handleCloseViewImg} />
    </div>
  );
};

export default ViewMailAttachmentMobileItem;
