import React from 'react';
import FilePreviewVideoOverlay from './FilePreviewVideoOverlay';

interface FilePreviewVideoWrapperProps {
  innerRef: React.RefObject<HTMLDivElement>;
  children: JSX.Element;
  isPlaying: boolean;
  isLoading: boolean;
  onMouseMove: () => void;
  onMouseLeave: () => void;
  onChangePlayPause: () => void;
}
const FilePreviewVideoWrapper = ({
  innerRef,
  children,
  isPlaying,
  isLoading,
  onMouseMove,
  onMouseLeave,
  onChangePlayPause,
}: FilePreviewVideoWrapperProps) => {
  return (
    <div
      ref={innerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative mx-auto  flex h-[576px] max-w-5xl flex-col justify-center bg-black"
    >
      <FilePreviewVideoOverlay
        isPlaying={isPlaying}
        isLoading={isLoading}
        onChangePlayPause={onChangePlayPause}
      />
      {children}
    </div>
  );
};

export default React.memo(FilePreviewVideoWrapper);
