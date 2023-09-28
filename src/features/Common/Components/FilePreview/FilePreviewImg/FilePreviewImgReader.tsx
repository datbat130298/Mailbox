import { useEffect, useMemo, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineZoomOut } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import { AttachmentType } from '../../../../../app/Types/commonTypes';

export interface FilePreviewImageProps {
  attachment: AttachmentType | null;
}

export interface ImageSizeType {
  size: number;
  sizeString: string;
}

const FilePreviewImageReader = ({ attachment }: FilePreviewImageProps) => {
  const [resize, setResize] = useState<ImageSizeType>({ size: 1, sizeString: 'scale-100' });
  const [resizeNumber, setResizeNumber] = useState<number>(1);

  const sizeData = useMemo(
    () => [
      {
        size: 1,
        sizeString: 'scale-100',
      },
      {
        size: 1.25,
        sizeString: 'scale-125',
      },
      {
        size: 1.5,
        sizeString: 'scale-150',
      },
      {
        size: 1.75,
        sizeString: 'scale-175',
      },
      {
        size: 2,
        sizeString: 'scale-200',
      },
    ],
    [],
  );

  useEffect(() => {
    if (resizeNumber >= 1) {
      const sizeZoom = sizeData.find((item) => item.size === resizeNumber);
      if (!sizeZoom) {
        return;
      }
      setResize(sizeZoom);
    }
  }, [resizeNumber, sizeData]);

  const handleWheelEvent = (deltaY: number) => {
    if (deltaY < 0) {
      if (resizeNumber < 2) {
        setResizeNumber((prev) => prev + 0.25);
      }
    }
    if (deltaY > 0) {
      if (resizeNumber > 1) {
        setResizeNumber((prev) => prev - 0.25);
      }
    }
  };

  return (
    <>
      <div
        className="z-0 flex h-screen w-full items-center justify-center overflow-hidden pt-5"
        role="button"
        tabIndex={0}
        onWheel={(e) => handleWheelEvent(e?.deltaY)}
      >
        <img
          className={twMerge(
            'max-w-4/5 z-0  h-fit max-h-fit-layout w-fit cursor-crosshair duration-150',
            resize?.sizeString,
          )}
          src={attachment?.url}
          alt={attachment?.file_name}
        />
      </div>
      <div
        className={twMerge('fixed bottom-4 z-20 flex h-fit w-full select-none items-center justify-center ')}
      >
        <div className="flex h-full w-fit rounded-[4px] bg-black bg-opacity-40 p-1">
          <div
            className={twMerge(
              'flex h-10 w-10 items-center justify-center text-white  hover:bg-gray-200 hover:bg-opacity-20',
              resizeNumber === 1 && 'text-gray-400',
            )}
            role="button"
            tabIndex={0}
            onClick={() => {
              if (resizeNumber > 1) {
                setResizeNumber((prev) => prev - 0.25);
              }
            }}
          >
            <AiOutlineMinus size={20} />
          </div>
          <div
            className={twMerge(
              'flex h-10 w-10 items-center justify-center text-white  hover:bg-gray-200 hover:bg-opacity-20',
              resizeNumber === 1 && 'text-gray-400',
            )}
            role="button"
            tabIndex={0}
            onClick={() => setResizeNumber(1)}
          >
            <AiOutlineZoomOut size={20} />
          </div>
          <div
            className={twMerge(
              'flex h-10 w-10 items-center justify-center text-white  hover:bg-gray-200 hover:bg-opacity-20',
              resizeNumber >= 2 && 'text-gray-400',
            )}
            role="button"
            tabIndex={0}
            onClick={() => {
              if (resizeNumber < 2) {
                setResizeNumber((prev) => prev + 0.25);
              }
            }}
          >
            <AiOutlinePlus size={20} />
          </div>
        </div>
      </div>
    </>
  );
};
export default FilePreviewImageReader;
