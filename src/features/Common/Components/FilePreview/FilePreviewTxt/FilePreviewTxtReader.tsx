import { useEffect, useMemo, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineZoomOut } from 'react-icons/ai';
import { twMerge } from 'tailwind-merge';
import { getTxtFile } from '../../../../../app/Services/UploadService';
import { AttachmentType } from '../../../../../app/Types/commonTypes';

export interface FilePreviewTxtProps {
  attachment: AttachmentType;
}

export interface ImageSizeType {
  size: number;
  sizeString: string;
}

const FilePreviewTxtReader = ({ attachment }: FilePreviewTxtProps) => {
  const [fileTxt, setFileTxt] = useState<string>('');
  const [sizeText, setSizeText] = useState<ImageSizeType>({ size: 1, sizeString: 'text-xs' });
  const [resizeNumber, setResizeNumber] = useState<number>(1);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getTxtFile(attachment.url).then((data) => {
      setFileTxt(data);
    });
  }, [attachment]);

  const sizeData = useMemo(
    () => [
      {
        size: 1,
        sizeString: 'text-xs',
      },
      {
        size: 1.25,
        sizeString: 'text-sm',
      },
      {
        size: 1.5,
        sizeString: 'text-md',
      },
      {
        size: 1.75,
        sizeString: 'text-lg',
      },
      {
        size: 2,
        sizeString: 'text-xl',
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
      setSizeText(sizeZoom);
    }
  }, [resizeNumber, sizeData]);

  return (
    <>
      <div className="z-0 mb-20 flex h-fit w-full items-center justify-center" role="button" tabIndex={0}>
        <div className="z-0 flex h-fit w-full select-none items-center justify-center px-40">
          <div className="flex h-fit min-h-[88vh] w-full whitespace-pre-line bg-white px-5 py-4">
            <div
              className={twMerge('select-text  font-mono', sizeText.sizeString)}
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: fileTxt }}
            />
          </div>
        </div>
      </div>
      <div
        className={twMerge('fixed bottom-4 z-20 flex h-fit w-full select-none items-center justify-center')}
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
export default FilePreviewTxtReader;
