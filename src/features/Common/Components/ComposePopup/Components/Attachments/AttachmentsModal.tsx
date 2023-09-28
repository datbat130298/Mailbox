import { motion } from 'framer-motion';
import _ from 'lodash';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { uploadImage } from '../../../../../../app/Services/UploadService';
import useNotify from '../../../../../Hooks/useNotify';
import Modal from '../../../Modal/Modal';
import DragAndDropFile from './DragAndDropFile';
import FileItem from './FileItem';

export class FileType {
  id!: string;

  file!: File;
}

export interface FileLoadedType {
  id: string;
  absolute_slug: string;
  file_name?: string;
  url?: string;
  size: number;
}
interface AttachmentsModalProp {
  isOpen: boolean;
  onClose: () => void;
  onChangeAttachment: (arr: FileLoadedType[]) => void;
  attachments: FileLoadedType[];
}

const AttachmentsModal = ({ isOpen, onClose, onChangeAttachment, attachments }: AttachmentsModalProp) => {
  const { t } = useTranslation();
  const toast = useNotify();

  const [selectTab, setSelectTab] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [fileUpload, setFileUpload] = useState<FileType[] | []>([]);
  const [files, setFiles] = useState<FileLoadedType[] | FileType[] | []>([]);

  const isAllowSubmit = useMemo(() => {
    if (!_.isEmpty(fileUpload) || !_.isEmpty(attachments)) {
      return true;
    }
    return false;
  }, [attachments, fileUpload, files]);

  const tabs = [
    {
      value: 'desktop',
      id: 1,
    },
  ];

  const handleSelectTab = (tab: number) => {
    setSelectTab(tab);
  };

  const handleChangeFile = useCallback(
    (fileList: FileList) => {
      const newArr = Array.from(fileList).map((file: File) => ({ id: nanoid(), file }));
      if (_.isEmpty(fileUpload)) {
        setFileUpload(newArr);
        return;
      }
      setFileUpload((prev) => [...prev, ...newArr]);
    },
    [fileUpload],
  );
  const handleRemoveFileItem = useCallback(
    (index: string) => {
      const newArr = fileUpload.filter((item) => item.id !== index);
      setFileUpload(newArr);
      if (_.isArray(files)) {
        const newArray = _.filter(files, (item: FileLoadedType | FileType) => item.id !== index);
        setFiles(newArray as FileLoadedType[] | FileType[]);
        onChangeAttachment(newArray as FileLoadedType[]);
      }
      onChangeAttachment([]);
      setFiles([]);
    },
    [fileUpload, files],
  );

  useEffect(() => {
    if (!isOpen) {
      setFileUpload([]);
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleUpload = async () => {
    setIsLoading(true);
    const imageArr = fileUpload.map(async (file: FileType) => {
      if (file.file instanceof File) {
        return uploadImage(file.file, 'mailbox')
          .then((res) => {
            toast.success(`Upload ${file.file.name} success`);
            return res;
          })
          .catch(() => {
            toast.error(`Upload ${file.file.name} error`);
          });
      }
      return file;
    });
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const res: any = await Promise.all(imageArr)
      .catch(() => toast.error(t('performing_action_error')))
      .finally(() => {
        setIsLoading(false);
      });

    if (!_.isEmpty(res)) {
      onClose();
      const newArr = files.map((item) => item);
      onChangeAttachment([...res.filter((item: any) => !!item === true), ...newArr]);
      return;
    }
    onClose();
  };

  const createImageFromFile = (file: any) => {
    if (file?.absolute_slug) {
      return file?.absolute_slug;
    }
    if (file instanceof File) {
      return URL.createObjectURL(file);
    }
    return file;
  };

  useEffect(() => {
    if (isOpen && !_.isEmpty(attachments)) {
      setFiles(attachments);
    }
  }, [isOpen, attachments]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      contentContainerClassName="w-[1000px] py-8 px-10"
      isShowHeader={false}
      titleConfirm="upload"
      titleCancel="cancel"
      onConfirm={handleUpload}
      isLoading={isLoading}
      isAllowSubmit={isAllowSubmit}
    >
      <div className="flex w-full items-center justify-start">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            role="button"
            tabIndex={0}
            onClick={() => handleSelectTab(tab.id)}
            className={twMerge(
              'relative px-2 py-1 pb-2 text-base font-medium text-slate-800',
              selectTab === tab.id && 'rounded-t-lg  border-b-0 border-gray-200 text-primary-600',
            )}
          >
            {t(tab.value)}
            {tab.id === selectTab && (
              <motion.div
                className="absolute bottom-[-1px] left-0 right-0 h-[1px] bg-primary-500"
                layoutId="underline"
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-7 flex h-[400px] w-full flex-row-reverse justify-start">
        <div
          className={twMerge(
            'h-full w-full ',
            (!_.isEmpty(fileUpload) || !_.isEmpty(files)) &&
              'w-80 border-l-2 border-dashed pl-6 transition-width',
          )}
        >
          <DragAndDropFile onChangeFile={handleChangeFile} />
        </div>

        <div
          className={twMerge(
            'mr-6 hidden h-[400px] w-full flex-1 flex-col overflow-auto',
            (!_.isEmpty(fileUpload) || !_.isEmpty(files)) && 'block',
          )}
        >
          {!_.isEmpty(files) &&
            files?.map((file) => (
              <FileItem
                key={file.id}
                src={createImageFromFile(file)}
                file={file instanceof FileType ? file.file : file}
                onRemoveFile={handleRemoveFileItem}
                index={file.id}
              />
            ))}

          {Array.from(fileUpload || [])?.map((file: FileType) => (
            <FileItem file={file.file} key={file.id} onRemoveFile={handleRemoveFileItem} index={file.id} />
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default AttachmentsModal;
