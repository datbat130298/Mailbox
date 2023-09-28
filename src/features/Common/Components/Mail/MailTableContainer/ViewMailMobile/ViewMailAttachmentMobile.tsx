import { nanoid } from 'nanoid';
import { useTranslation } from 'react-i18next';
import { AttachmentType } from '../../../../../../app/Types/commonTypes';
import ViewMailAttachmentMobileItem from './ViewMailAttchmentMobileItem';

interface ViewMailAttachmentMobileProp {
  attachments: AttachmentType[];
}

const ViewMailAttachmentMobile = ({ attachments }: ViewMailAttachmentMobileProp) => {
  const { t } = useTranslation();
  return (
    <div className="mx-4 mt-4 flex flex-col gap-3 overflow-hidden border-b border-t px-1 pb-4 pt-3">
      <div className="flex items-center justify-start gap-2">
        <p className="text-sm font-semibold">{`${attachments.length} ${t('attachment')}(s)`}</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {attachments?.map((item) => (
          <div className="col-span-1" key={nanoid()}>
            <ViewMailAttachmentMobileItem attachment={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewMailAttachmentMobile;
