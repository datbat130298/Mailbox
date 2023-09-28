import { FaArrowLeft } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';
import { AttachmentType } from '../../../../../../app/Types/commonTypes';

interface ViewMailAttachmentImgMobileProp {
  attachment: AttachmentType;
  onClose: () => void;
}

const ViewMailAttachmentImgMobile = ({ attachment, onClose }: ViewMailAttachmentImgMobileProp) => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-[99999] flex h-screen w-screen items-center justify-center overflow-hidden bg-black bg-opacity-90"
      role="button"
      tabIndex={0}
      // onWheel={(e) => handleWheelEvent(e?.deltaY)}
    >
      <div className="absolute top-6 flex w-full items-center justify-start gap-3 px-4 text-white">
        <div className="" role="button" tabIndex={0} onClick={onClose}>
          <FaArrowLeft />
        </div>
        <p>{attachment.file_name}</p>
      </div>
      <img
        className={twMerge(
          'max-w-4/5 z-0  h-fit max-h-fit-layout w-fit cursor-crosshair duration-150',
          // resize?.sizeString,
        )}
        src={attachment?.url}
        alt={attachment?.file_name}
      />
    </div>
  );
};

export default ViewMailAttachmentImgMobile;
