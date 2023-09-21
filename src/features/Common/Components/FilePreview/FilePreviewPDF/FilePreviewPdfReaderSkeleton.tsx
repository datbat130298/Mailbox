import React, { forwardRef } from 'react';

const FilePreviewPdfReaderSkeleton = (_: unknown, ref: React.Ref<HTMLDivElement>) => {
  return (
    <div className="mx-auto -mt-10 flex h-fit-layout max-w-screen-md items-center justify-center" ref={ref}>
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white border-t-transparent" />
    </div>
  );
};

export default forwardRef(FilePreviewPdfReaderSkeleton);
