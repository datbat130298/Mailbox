import { DragEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LuUpload } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';

interface DragAndDrogFilesProp {
  onChangeFile: (fileList: FileList) => void;
}

const DragAndDropFile = ({ onChangeFile }: DragAndDrogFilesProp) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const handleFile = (files: FileList) => {
    onChangeFile(files);
  };

  const handleDrag = (e: DragEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLFormElement | HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
    setDragActive(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };

  const handleClickImport = () => {
    if (inputRef.current === null) return;
    inputRef.current.click();
  };

  return (
    <form
      id="form-file-upload"
      onDragEnter={handleDrag}
      className="relative h-full w-full transition-width duration-200"
      onSubmit={(e) => e.preventDefault()}
    >
      <input ref={inputRef} type="file" multiple onChange={handleChange} className="hidden" />
      <div
        className={twMerge(
          'flex min-h-[400px] items-center justify-center border-2 border-dashed border-gray-300 bg-slate-50 hover:bg-slate-100',
          dragActive && 'bg-slate-200',
        )}
        tabIndex={0}
        role="button"
        onClick={handleClickImport}
      >
        <div className="flex w-full flex-col items-center justify-center gap-5 px-4">
          <LuUpload className="text-gray-500" size={40} />
          <p className="text-center font-semibold text-gray-500">{t('drag-drop-here')}</p>
        </div>
      </div>
      {dragActive && (
        <div
          id="drag-file-element"
          className="absolute bottom-0 left-0 right-0 top-0 h-full w-full"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        />
      )}
    </form>
  );
};

export default DragAndDropFile;
