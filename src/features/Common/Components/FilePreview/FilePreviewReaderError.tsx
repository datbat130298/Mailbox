import axios from 'axios';
import fileDownload from 'js-file-download';
import { useTranslation } from 'react-i18next';
import { HiOutlineDownload } from 'react-icons/hi';
import Button from '../Button';
import { AttachmentType } from '../Mail/MailTableContainer/ViewMailSpaceItem/ViewMailAttachment/ViewMailAttachments';

interface FilePreviewReaderErrorProps {
  attachment: AttachmentType | null;
}

const FilePreviewReaderError = ({ attachment }: FilePreviewReaderErrorProps) => {
  const { t } = useTranslation();

  const handleDownload = () => {
    if (attachment) {
      if (!attachment.absolute_slug) return;
      axios
        .get(attachment.absolute_slug, { responseType: 'blob' })
        .then((res) => fileDownload(res.data, attachment.name));
    }
  };

  return (
    <div className="-mt-10 flex min-h-fit-layout w-full flex-col items-center justify-center">
      <div className="max-w-screen-lg rounded-xl bg-white px-16 py-10">
        <div className="text-center">{t('failed')}</div>
        <div className="mt-1 text-center">{t('tryInLocal')}</div>

        <Button size="sm" className="mx-auto mt-9 rounded-md" onClick={handleDownload}>
          <HiOutlineDownload size={20} className="mr-2" />
          {t('download')}
        </Button>
      </div>
    </div>
  );
};

export default FilePreviewReaderError;
