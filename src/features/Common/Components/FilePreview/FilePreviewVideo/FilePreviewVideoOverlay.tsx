import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IoMdPause, IoMdPlay } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';

interface FilePreviewVideoOverlayProps {
  isPlaying: boolean;
  isLoading: boolean;
  onChangePlayPause: () => void;
}

const FilePreviewVideoOverlay = ({
  onChangePlayPause,
  isPlaying,
  isLoading,
}: FilePreviewVideoOverlayProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onChangePlayPause}
      className="absolute left-0 top-0 z-40 flex h-full w-full items-center justify-center"
    >
      <div className="relative flex h-full w-full items-center justify-center">
        {isLoading && (
          <div className="absolute m-0 animate-spin">
            <AiOutlineLoading3Quarters size={56} color="#fff" />
          </div>
        )}
        <div
          className={twMerge(
            'absolute scale-0 rounded-full bg-black/50 p-3 opacity-100 transition duration-500 ease-linear',
            isPlaying && 'scale-150 opacity-0',
          )}
        >
          {isPlaying ? <IoMdPlay size={36} color="#fff" /> : <IoMdPause size={36} color="#fff" />}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FilePreviewVideoOverlay);
