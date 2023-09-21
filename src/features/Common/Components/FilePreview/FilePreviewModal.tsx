import { Dialog } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import _ from 'lodash';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import {
  AudioFileExtensionEnum,
  ExcelFileExtensionEnum,
  HTMLFileExtensionEnum,
  ImageFileExtensionEnum,
  PDFFileExtensionEnum,
  TextFileExtensionEnum,
  VideoFileExtensionEnum,
} from '../../../../app/Enums/commonEnums';
import { AttachmentType } from '../Mail/MailTableContainer/ViewMailSpaceItem/ViewMailAttachment/ViewMailAttachments';
import FilePreviewAudioReader from './FilePreviewAudio/FilePreviewAudioReader';
import FilePreviewImageReader from './FilePreviewImg/FilePreviewImgReader';
import FilePreviewPdfReader from './FilePreviewPDF/FilePreivewPdfReader';
import FilePreviewReaderError from './FilePreviewReaderError';
import FilePreviewTxtReader from './FilePreviewTxt/FilePreviewTxtReader';
import FilePreviewVideoReader from './FilePreviewVideo/FilePreviewVideoReader';
import FilePreviewXlsxReader from './FilePreviewXlsx/FilePreviewXlsxReader';

interface FilePreviewModalProp {
  isOpen: boolean;
  onClose: () => void;
  attachment: AttachmentType;
  nextFile?: AttachmentType | null;
  prevFile?: AttachmentType | null;
}

const FilePreviewModal = ({ isOpen, onClose, attachment, nextFile, prevFile }: FilePreviewModalProp) => {
  const fileExtension = attachment?.name.split('.').at(-1);

  const supportedXlsx: string[] = [ExcelFileExtensionEnum.XLSX, ExcelFileExtensionEnum.XLS];
  const supportedImg: string[] = [
    ImageFileExtensionEnum.JPG,
    ImageFileExtensionEnum.PNG,
    ImageFileExtensionEnum.GIF,
    ImageFileExtensionEnum.JPEG,
    ImageFileExtensionEnum.SVG,
  ];
  const supportedVideo: string[] = [VideoFileExtensionEnum.MP4, VideoFileExtensionEnum.WEBM];
  const supportedHtml: string[] = [HTMLFileExtensionEnum.HTML];
  const supportedAudio: string[] = [AudioFileExtensionEnum.MP3];
  const supportedPdf: string[] = [PDFFileExtensionEnum.PDF];
  const supportedText: string[] = [TextFileExtensionEnum.TXT];

  const supportedFileExtensions: string[] = [
    ...supportedXlsx,
    ...supportedImg,
    ...supportedVideo,
    ...supportedHtml,
    ...supportedAudio,
    ...supportedPdf,
    ...supportedText,
  ];

  const handleChangeCurrentFile = (file: AttachmentType) => {
    // eslint-disable-next-line no-console
    console.log(file);
  };

  return (
    <AnimatePresence initial={false} mode="wait">
      {isOpen && (
        <Dialog
          open={isOpen}
          as="div"
          className="fixed inset-0 z-[99] overflow-y-auto"
          onClose={() => {
            onClose();
            // setIsViewInfo(false);
          }}
        >
          <div className="my-auto  flex max-h-full">
            <div className="flex h-fit w-full">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0,
                  delay: 0,
                  ease: 'linear',
                  times: [0, 0.71, 0.2, 1.01],
                }}
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-80 transition-opacity" />
              </motion.div>
              <div className="relative z-50 h-fit w-full ">
                <div
                  className={twMerge(
                    'fixed left-0 right-0 top-0 z-20 flex h-20 items-center justify-between',
                    // isHighlightHeader && ' h-16 bg-[#323232] shadow drop-shadow-md',
                    // !isHighlightHeader && ' bg-gradient-to-b from-black to-black/0',
                  )}
                >
                  <div className="z-20 mt-2 flex items-center justify-start space-x-4 px-4 text-white">
                    <div
                      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full duration-100 hover:bg-black"
                      role="button"
                      tabIndex={0}
                      onClick={() => {
                        onClose();
                        // setIsViewInfo(false);
                      }}
                    >
                      <HiOutlineArrowLeft />
                    </div>
                    <div>{attachment?.name}</div>
                  </div>
                </div>
                {prevFile && (
                  <div
                    className="fixed left-6 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 bg-opacity-70 text-white duration-100 hover:bg-black"
                    role="button"
                    tabIndex={0}
                    onClick={() => handleChangeCurrentFile(prevFile)}
                  >
                    <BiChevronLeft size={24} className="mb-0.5" />
                  </div>
                )}
                {nextFile && (
                  <div
                    className={twMerge(
                      'fixed top-1/2  z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white duration-100 hover:bg-black',
                      // isViewInfo ? 'right-[338px]' : 'right-6',
                    )}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleChangeCurrentFile(nextFile)}
                  >
                    <BiChevronRight size={24} className="mb-0.5" />
                  </div>
                )}
                {(!fileExtension || !supportedFileExtensions.includes(fileExtension)) && (
                  <FilePreviewReaderError attachment={attachment} />
                )}
                {_.values(ExcelFileExtensionEnum).includes(fileExtension as ExcelFileExtensionEnum) && (
                  <FilePreviewXlsxReader attachment={attachment} />
                )}
                {_.values(PDFFileExtensionEnum).includes(fileExtension as PDFFileExtensionEnum) && (
                  <FilePreviewPdfReader attachment={attachment} />
                )}
                {_.values(ImageFileExtensionEnum).includes(fileExtension as ImageFileExtensionEnum) && (
                  <FilePreviewImageReader attachment={attachment} />
                )}
                {_.values(VideoFileExtensionEnum).includes(fileExtension as VideoFileExtensionEnum) && (
                  <FilePreviewVideoReader attachment={attachment} />
                )}
                {_.values(TextFileExtensionEnum).includes(fileExtension as TextFileExtensionEnum) && (
                  <FilePreviewTxtReader attachment={attachment} />
                )}
                {_.values(AudioFileExtensionEnum).includes(fileExtension as AudioFileExtensionEnum) && (
                  <FilePreviewAudioReader attachment={attachment} />
                )}
              </div>
            </div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default FilePreviewModal;
