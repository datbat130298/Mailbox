import _ from 'lodash';
import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  ExcelFileExtensionEnum,
  HTMLFileExtensionEnum,
  ImageFileExtensionEnum,
  TextFileExtensionEnum,
  VideoFileExtensionEnum,
} from '../../../../../../app/Enums/commonEnums';
import { AttachmentType } from '../../../Mail/MailTableContainer/ViewMailSpaceItem/ViewMailAttachment/ViewMailAttachments';
import { FileLoadedType } from './AttachmentsModal';

interface AttachmentIconExtensionProp {
  attachment: AttachmentType | File | FileLoadedType;
  classNameAll?: string;
}

const AttachmentIconExtension = ({ attachment, classNameAll }: AttachmentIconExtensionProp) => {
  const fileExtension =
    attachment instanceof File
      ? attachment?.name.split('.').at(-1)
      : attachment?.absolute_slug?.split('.').at(-1);

  const AttachmentIcon = useMemo(() => {
    if (_.values(TextFileExtensionEnum).includes(fileExtension as TextFileExtensionEnum)) {
      return <img src="https://cdn-icons-png.flaticon.com/512/32/32329.png" alt="text" />;
    }
    if (_.values(HTMLFileExtensionEnum).includes(fileExtension as HTMLFileExtensionEnum)) {
      return <img src="https://cdn-icons-png.flaticon.com/512/103/103077.png" alt="html" />;
    }

    if (_.values(ExcelFileExtensionEnum).includes(fileExtension as ExcelFileExtensionEnum)) {
      return (
        <img
          src="https://p7.hiclipart.com/preview/917/965/263/microsoft-excel-microsoft-office-2013-icon-excel-png-transparent.jpg"
          alt="excel"
        />
      );
    }

    if (_.values(ImageFileExtensionEnum).includes(fileExtension as ImageFileExtensionEnum)) {
      return (
        <img
          src={attachment instanceof File ? URL.createObjectURL(attachment) : attachment.absolute_slug}
          alt="img"
          className="h-full w-full object-cover"
        />
      );
    }

    if (_.values(VideoFileExtensionEnum).includes(fileExtension as VideoFileExtensionEnum)) {
      return (
        <img src="https://i.pinimg.com/564x/a3/e6/38/a3e638ecf2e8d2f0ea59bc0f09a5e11f.jpg" alt="video" />
      );
    }
    return (
      <img
        alt={fileExtension}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Icon-round-Question_mark.svg/2048px-Icon-round-Question_mark.svg.png"
      />
    );
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
