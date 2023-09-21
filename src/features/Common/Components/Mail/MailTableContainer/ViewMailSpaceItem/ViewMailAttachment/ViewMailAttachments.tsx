import { nanoid } from 'nanoid';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import ViewMailAttachmentItem from './ViewMailAttachmentItem';

export interface AttachmentType {
  name: string;
  absolute_slug: string;
  size: number;
}

interface ViewMailAttachmentProp {
  attachments: AttachmentType[];
}

const ViewMailAttachment = ({ attachments }: ViewMailAttachmentProp) => {
  const { t } = useTranslation();

  const [isShow, setIsShowFull] = useState(true);

  const handleClickShow = () => {
    setIsShowFull((prev) => !prev);
  };

  return (
    <div className="mx-4 mt-4 flex flex-col gap-3 overflow-hidden border-b pb-4">
      <div className="flex items-center justify-start gap-2">
        <div
          role="button"
          tabIndex={0}
          onClick={handleClickShow}
          className={twMerge(
            'flex h-5 w-5 items-center justify-center rounded-full border border-gray-700 transition-all',
            !isShow && '-rotate-90',
          )}
        >
          <MdKeyboardArrowDown />
        </div>
        <p className="text-sm font-semibold">{`${attachments.length} ${t('attachment')}(s)`}</p>
      </div>
      {isShow && (
        <div className="ml-7 mt-1 flex flex-wrap gap-3">
          {attachments.map((item: AttachmentType) => (
            <ViewMailAttachmentItem attachment={item} key={nanoid()} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewMailAttachment;
