import { round } from 'lodash';
import { PDFPageProxy } from 'pdfjs-dist';
import { PDFDocumentProxy } from 'pdfjs-dist/types/src/display/api';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineZoomOut } from 'react-icons/ai';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { Document, Page, pdfjs } from 'react-pdf';
import { OnDocumentLoadSuccess, OnRenderSuccess } from 'react-pdf/dist/cjs/shared/types';
import { twMerge } from 'tailwind-merge';
import { AttachmentType } from '../../../../../app/Types/commonTypes';
import FilePreviewReaderError from '../FilePreviewReaderError';
import FilePreviewPdfReaderSkeleton from './FilePreviewPdfReaderSkeleton';

export interface FilePreviewPdfReaderProps {
  attachment: AttachmentType | null;
}

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const FilePreviewPdfReader = ({ attachment }: FilePreviewPdfReaderProps) => {
  const RESIZE_STEP = 0.2;

  const [numPages, setNumPages] = useState<number | null>(null);
  const [renderedPages, setRenderedPages] = useState<number | null>(null);
  const [inViewportPage, setInViewportPage] = useState<number>(1);
  const [renderedPageHeight, setRenderedPageHeight] = useState<number | null>(null);
  const [resizeNumber, setResizeNumber] = useState<number>(1);

  const sizeData = useMemo(
    () => [
      {
        size: 1,
        sizeString: 'scale-100',
      },
      {
        size: 1 + RESIZE_STEP,
        sizeString: 'scale-120',
      },
      {
        size: 1 + 2 * RESIZE_STEP,
        sizeString: 'scale-140',
      },
      {
        size: 1 + 3 * RESIZE_STEP,
        sizeString: 'scale-160',
      },
      {
        size: 1 + 4 * RESIZE_STEP,
        sizeString: 'scale-180',
      },
    ],
    [],
  );

  const sizeClassName = useMemo(() => {
    const sizeZoom = sizeData.find((item) => item.size === resizeNumber);
    if (!sizeZoom) {
      return '';
    }
    return sizeZoom.sizeString;
  }, [resizeNumber, sizeData]);
  const maxResizeNumber = useMemo(() => sizeData[sizeData.length - 1].size, [sizeData]);

  const scrollToPageAfterRender = useRef<boolean>(false);

  const pagesRenderedPlusOne = useMemo(
    () => Math.min((renderedPages || 0) + 1, numPages || 0),
    [numPages, renderedPages],
  );

  const dialogContainer = useMemo(
    () => window.document.querySelector('.fixed.inset-0.z-50.overflow-y-auto'),
    [],
  );

  const handleLoadSuccess = ({ numPages: numPagesParam }: PDFDocumentProxy) => {
    setNumPages(numPagesParam);
    setRenderedPages(0);
  };

  const handleRenderSuccess = (page: PDFPageProxy) => {
    const [, , width, height] = page.view;

    const newRenderedPageHeight = (height * 768) / width;

    if (!renderedPageHeight) {
      setRenderedPageHeight(newRenderedPageHeight);
    }

    if (scrollToPageAfterRender.current) {
      scrollToPageAfterRender.current = false;
      dialogContainer?.scrollTo({
        top: ((renderedPages || 0) - 1) * (newRenderedPageHeight || 0),
        behavior: 'smooth',
      });
    }
  };

  const handleClickChangePage = (increase = 1) => {
    const newInViewportPage = inViewportPage + increase;
    const newRenderedPages = Math.min(newInViewportPage, numPages || 0);

    if (newInViewportPage <= (renderedPages || 0)) {
      dialogContainer?.scrollTo({
        top: (newInViewportPage - 1) * (renderedPageHeight || 0),
        behavior: 'smooth',
      });
      return;
    }

    setRenderedPages(newRenderedPages);
    scrollToPageAfterRender.current = true;
  };

  const handleScrollViewport = useCallback(
    (e: Event) => {
      const target = e.target as HTMLDivElement;
      const { scrollTop } = target;

      const pageHeight = renderedPageHeight || 0;
      const missingCurrentPageHeight = pageHeight - (scrollTop % pageHeight);
      const currentPage = Math.floor(scrollTop / pageHeight) + 1;

      let newRenderedPages = renderedPages || 0;
      let newInViewportPage = inViewportPage || 0;

      if (scrollTop > (renderedPages || 0) * pageHeight) {
        newRenderedPages = Math.min(currentPage, numPages || 0);
      }

      if (pageHeight) {
        if (missingCurrentPageHeight < 512) {
          newInViewportPage = currentPage + 1;
        } else {
          newInViewportPage = currentPage;
        }
      }

      setRenderedPages(newRenderedPages);
      setInViewportPage(newInViewportPage);
    },
    [renderedPageHeight, renderedPages, inViewportPage, numPages],
  );

  const handleResize = (increase = RESIZE_STEP) => {
    const newResizeNumber = round(resizeNumber + increase, 1);
    const prevResizeNumber = round(resizeNumber, 1);
    const newPageHeight = (renderedPageHeight || 0) * (newResizeNumber / prevResizeNumber);

    if (newResizeNumber > maxResizeNumber || newResizeNumber < 1) {
      return;
    }

    setResizeNumber(newResizeNumber);
    setRenderedPageHeight(newPageHeight);
  };

  const handleResetResize = () => {
    setResizeNumber(1);
    setRenderedPageHeight((prev) => (prev ? prev / resizeNumber : null));
  };

  useEffect(() => {
    if (!dialogContainer) {
      return undefined;
    }

    dialogContainer.addEventListener('scroll', handleScrollViewport);

    return () => {
      dialogContainer.removeEventListener('scroll', handleScrollViewport);
    };
  }, [dialogContainer, handleScrollViewport]);

  useEffect(() => {
    setNumPages(null);
  }, [attachment]);

  return (
    <div>
      <Document
        file={attachment?.url}
        className={twMerge('mx-auto flex max-w-screen-md origin-top flex-col justify-center', sizeClassName)}
        loading={<FilePreviewPdfReaderSkeleton />}
        error={<FilePreviewReaderError attachment={attachment} />}
        onLoadSuccess={handleLoadSuccess as unknown as OnDocumentLoadSuccess}
      >
        {Array.from(new Array(pagesRenderedPlusOne), (_, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={768}
            className={twMerge('mb-4')}
            onRenderSuccess={handleRenderSuccess as unknown as OnRenderSuccess}
          />
        ))}
        {/* {(numPages || 0) - pagesRenderedPlusOne > 1 &&
          Array.from(new Array((numPages || 0) - pagesRenderedPlusOne), (_, index) => (
            <LoadingSkeleton
              key={`page_${index + 1}`}
              className="w-full rounded-none"
              style={{
                height: renderedPageHeight || 0,
              }}
            />
          ))} */}
      </Document>
      {numPages && inViewportPage && (
        <div className="fixed bottom-4 left-1/2 z-10 flex -translate-x-1/2 select-none items-center rounded-md bg-black bg-opacity-80 p-1 text-white duration-100">
          <div
            className={twMerge(
              'mr-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded hover:bg-gray-200 hover:bg-opacity-20',
              inViewportPage === 1 && 'cursor-default text-gray-400',
            )}
            role="button"
            tabIndex={0}
            onClick={() => handleClickChangePage(-1)}
          >
            <BiChevronLeft size={24} />
          </div>
          {inViewportPage}
          <span className="mx-2">/</span>
          {numPages}
          <div
            className={twMerge(
              'ml-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-sm hover:bg-gray-200 hover:bg-opacity-20',
              inViewportPage === numPages && 'cursor-default text-gray-400',
            )}
            role="button"
            tabIndex={0}
            onClick={() => handleClickChangePage(1)}
          >
            <BiChevronRight size={24} />
          </div>
          <div className="mx-1 h-6 w-px bg-gray-400" />
          <div
            className={twMerge(
              'flex h-10 w-10 cursor-pointer items-center justify-center rounded hover:bg-gray-200 hover:bg-opacity-20',
              resizeNumber === 1 && 'cursor-default text-gray-400',
            )}
            role="button"
            tabIndex={0}
            onClick={() => handleResize(-RESIZE_STEP)}
          >
            <AiOutlineMinus size={18} />
          </div>
          <div
            className={twMerge(
              'flex h-10 w-10 cursor-pointer items-center justify-center rounded hover:bg-gray-200 hover:bg-opacity-20',
              resizeNumber === 1 && 'cursor-default text-gray-400',
            )}
            role="button"
            tabIndex={0}
            onClick={handleResetResize}
          >
            <AiOutlineZoomOut size={18} />
          </div>
          <div
            className={twMerge(
              'flex h-10 w-10 cursor-pointer items-center justify-center rounded hover:bg-gray-200 hover:bg-opacity-20',
              resizeNumber === maxResizeNumber && 'cursor-default text-gray-400',
            )}
            role="button"
            tabIndex={0}
            onClick={() => handleResize(RESIZE_STEP)}
          >
            <AiOutlinePlus size={18} />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilePreviewPdfReader;
