import _ from 'lodash';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  ExcelFileExtensionEnum,
  HTMLFileExtensionEnum,
  ImageFileExtensionEnum,
  PDFFileExtensionEnum,
  TextFileExtensionEnum,
  VideoFileExtensionEnum,
} from '../../../../../../app/Enums/commonEnums';
import { AttachmentType } from '../../../../../../app/Types/commonTypes';
import excel from '../../../../../../assets/image/excel.jpg';
import html from '../../../../../../assets/image/html.png';
import pdf from '../../../../../../assets/image/pdf.png';
import text from '../../../../../../assets/image/text.png';
import unknowfile from '../../../../../../assets/image/unknowfile.png';
import video from '../../../../../../assets/image/video.jpg';
import { FileLoadedType } from './AttachmentsModal';

interface AttachmentIconExtensionProp {
  attachment: AttachmentType | File | FileLoadedType;
  classNameAll?: string;
}

const AttachmentIconExtension = ({ attachment, classNameAll }: AttachmentIconExtensionProp) => {
  const fileExtension = useMemo(() => {
    if (attachment instanceof File) {
      return attachment?.name.split('.').at(-1);
    }
    if (attachment?.url !== undefined) {
      return attachment?.url?.split('.').at(-1);
    }
    if (attachment?.absolute_slug && attachment?.absolute_slug !== undefined) {
      return attachment?.absolute_slug?.split('.').at(-1);
    }
    return '';
  }, [attachment]);

  const AttachmentIcon = useMemo(() => {
    if (_.values(TextFileExtensionEnum).includes(fileExtension as TextFileExtensionEnum)) {
      return <img src={text} alt="text" />;
    }
    if (_.values(HTMLFileExtensionEnum).includes(fileExtension as HTMLFileExtensionEnum)) {
      return <img src={html} alt="html" />;
    }

    if (_.values(ExcelFileExtensionEnum).includes(fileExtension as ExcelFileExtensionEnum)) {
      return <img src={excel} alt="excel" />;
    }

    if (_.values(ImageFileExtensionEnum).includes(fileExtension as ImageFileExtensionEnum)) {
      return (
        <img
          src={
            attachment instanceof File
              ? URL.createObjectURL(attachment)
              : attachment.url || attachment.absolute_slug
          }
          alt="img"
          className="h-full w-full object-cover"
        />
      );
    }
    if (_.values(VideoFileExtensionEnum).includes(fileExtension as VideoFileExtensionEnum)) {
      return <img src={video} alt="video" />;
    }
    if (_.values(PDFFileExtensionEnum).includes(fileExtension as PDFFileExtensionEnum)) {
      return <img src={pdf} alt="pdf" />;
    }
    return <img alt={fileExtension} src={unknowfile} />;
  }, [fileExtension]);

  return (
    <div
      className={twMerge(
        'flex h-full w-full items-center justify-center bg-slate-200',
        !_.values(ImageFileExtensionEnum).includes(fileExtension as ImageFileExtensionEnum) && classNameAll,
      )}
    >
      {AttachmentIcon}
    </div>
  );
};

export default AttachmentIconExtension;
