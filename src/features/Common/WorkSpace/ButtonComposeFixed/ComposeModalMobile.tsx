import _ from 'lodash';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoArrowBack, IoLink } from 'react-icons/io5';
import { MdMoreVert } from 'react-icons/md';
import { TbSend } from 'react-icons/tb';
import { twMerge } from 'tailwind-merge';
import { sendEmail } from '../../../../app/Services/Sent/SentService';
import { uploadImage } from '../../../../app/Services/UploadService';
import { MailType } from '../../../../app/Types/commonTypes';
import useNotify from '../../../Hooks/useNotify';
import useSelector from '../../../Hooks/useSelector';
import { FileType } from '../../Components/ComposePopup/Components/Attachments/AttachmentsModal';
import ComposePopupInput from '../../Components/ComposePopup/Components/ComposePopupInput';
import ComposePopupRecipient from '../../Components/ComposePopup/Components/ComposePopupRecipient/ComposePopupRecipient';
import WriterCompose from '../../Components/ComposePopup/Components/EditorWriterCompose';
import Modal from '../../Components/Modal/Modal';
import { EmailType } from '../../Components/SelectMultiEmail/SelectMultiEmail';
import Tooltip from '../../Components/Tooltip/Tooltip';
import FileItemMobile from './FileItemMobile';

interface ComposeModalMobileProp {
  isOpen: boolean;
  onClose: () => void;
  mail?: MailType | null;
  dataForward?: string;
  recipient?: Array<EmailType>;
}

const ComposeModalMobile = ({ isOpen, onClose, dataForward, recipient, mail }: ComposeModalMobileProp) => {
  const [subject, setSubject] = useState<string>('');
  const [selectedRecipient, setSelectedRecipient] = useState<Array<EmailType>>([]);
  const [selectedCcRecipient, setSelectedCcRecipient] = useState<Array<EmailType>>([]);
  const [selectedBccRecipient, setSelectedBccRecipient] = useState<Array<EmailType>>([]);
  const [content, setContent] = useState('');
  const [, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<FileType[]>([]);
  // const [fileUpload, setFileUpload] = useState<FileType[] | []>([]);

  const userEmail = useSelector((state) => state.user.email);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const toast = useNotify();

  const handleOnChangeRecipient = (selectedOptions: Array<EmailType>) =>
    setSelectedRecipient(selectedOptions);

  const handleOnChangeCcRecipient = (selectedOptions: Array<EmailType>) =>
    setSelectedCcRecipient(selectedOptions);

  const handleOnChangeBccRecipient = (selectedOptions: Array<EmailType>) =>
    setSelectedBccRecipient(selectedOptions);

  const handleChangeEditor = (value: string) => {
    // if (content) {
    //   return;
    // }
    setContent(value);
  };

  const onChangeSubjectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
  };

  useEffect(() => {
    if (isOpen && mail) {
      setSubject(mail.subject);
      setContent(mail.body);

      const recipientEmail =
        mail?.sents_email_address?.map((item) => ({
          id: item.id || nanoid(),
          email: item.email_address,
        })) || [];
      const recipientBcc = mail?.bcc?.map((item: string) => ({ id: nanoid(), email: item })) || [];
      const recipientCc = mail.cc?.map((item: string) => ({ id: nanoid(), email: item }));

      setSelectedRecipient(recipientEmail as EmailType[]);
      setSelectedBccRecipient(recipientBcc as EmailType[]);
      setSelectedCcRecipient(recipientCc as EmailType[]);
    }
  }, [isOpen, mail]);

  const handleImg = async (array: File[]) => {
    const imageArr = array.map((item) => {
      if (item instanceof File) {
        return uploadImage(item, 'mailbox').then((res) => {
          setIsSubmitting(true);
          return res.absolute_slug;
        });
      }

      return item;
    });
    const res = await Promise.all(imageArr).catch(() => toast.error(t('performing_action_error')));
    return res;
  };

  const handleClickSend = async () => {
    setIsSubmitting(true);
    const recipientEmail = selectedRecipient.map((item) => item.email);
    const recipientBcc = selectedBccRecipient.map((item) => item.email);
    const recipientCc = selectedCcRecipient.map((item) => item.email);
    const image = files.map((item: FileType) => item.file);
    const img = await handleImg(image);

    const dataSubmit = {
      files: img,
      email_address: [...recipientEmail],
      cc: [...recipientCc],
      bcc: [...recipientBcc],
      body: content,
      type: 'PROCESSING',
      subject,
    };
    onClose();
    sendEmail(dataSubmit)
      .then(() => {
        toast.success('sent_success');
      })
      .catch(() => toast.error('sent_error'))
      .finally(() => setIsSubmitting(false));
  };

  const handleClickInsert = () => {
    if (inputRef.current !== null) {
      inputRef.current?.click();
    }
  };

  const handleChangFile = useCallback(
    (fileList: FileList) => {
      const newArr = Array.from(fileList).map((file: File) => ({ id: nanoid(), file }));
      if (_.isEmpty(files)) {
        setFiles(newArr);
        return;
      }
      setFiles((prev) => [...prev, ...newArr]);
    },
    [files],
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleChangFile(e.target.files);
    }
  };

  const handleRemoveFileItem = useCallback(
    (index: string) => {
      const newArr = files.filter((item) => item.id !== index);
      setFiles(newArr);
      if (_.isArray(files)) {
        const newArray = _.filter(files, (item: FileType) => item.id !== index);
        setFiles(newArray as FileType[]);
      }
      setFiles([]);
    },
    [files],
  );

  useEffect(() => {
    if (isOpen) {
      const delayVisibleToolbar = setTimeout(() => {
        const toolbar = document.querySelector<HTMLDivElement>('.ck.ck-toolbar');
        if (toolbar) {
          toolbar.style.display = 'none';
        }
      }, 300);
      return () => clearTimeout(delayVisibleToolbar);
    }
    return undefined;
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      if (recipient) {
        setSelectedBccRecipient(recipient);
      }
      const delaySetContent = setTimeout(() => {
        if (dataForward) {
          setContent(dataForward);
        }
      }, 100);
      return () => clearTimeout(delaySetContent);
    }
    return undefined;
  }, [isOpen, dataForward, recipient]);

  useEffect(() => {
    if (!isOpen) {
      setContent('');
      setSubject('');
      setFiles([]);
      setSelectedRecipient([]);
      setSelectedBccRecipient([]);
      setSelectedCcRecipient([]);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isShowFooter={false}
      isShowHeader={false}
      className="overflow-hidden rounded-none"
      contentContainerClassName="p-0 h-screen w-screen rounded-none"
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex items-center justify-between bg-slate-100 p-3 text-gray-800">
          <div className="flex items-center space-x-3">
            <div role="button" tabIndex={0} onClick={onClose}>
              <IoArrowBack size={22} className="mt-0.5" />
            </div>
            <p className="text-lg ">{t('compose')}</p>
          </div>
          <div className="flex items-center space-x-3 text-gray-800">
            <Tooltip position="bottom" title="insert link">
              <div className="" role="button" tabIndex={0} onClick={handleClickInsert}>
                <IoLink className="" size={22} />
              </div>
              <input className="hidden" type="file" ref={inputRef} multiple onChange={handleChangeInput} />
            </Tooltip>

            <Tooltip position="bottom" title="sent">
              <div className="" role="button" tabIndex={0} onClick={handleClickSend}>
                <TbSend size={20} className="ml-1 rotate-45" />
              </div>
            </Tooltip>
            <Tooltip position="bottom" title="more">
              <MdMoreVert size={22} />
            </Tooltip>
          </div>
        </div>
        <div className="mx-4 mt-1 flex gap-3 border-b-[0.5px] py-3 text-sm">
          <p className="text-[#9CA3AF]">From</p>
          <p className="text-slate-800">{userEmail}</p>
        </div>
        <ComposePopupInput
          placeholder={t('subject')}
          value={subject}
          onChange={onChangeSubjectInput}
          className="mx-4"
        />
        <ComposePopupRecipient
          selectRecipient={selectedRecipient}
          selectedCcRecipient={selectedCcRecipient}
          selectedBccRecipient={selectedBccRecipient}
          onChangeSelectRecipient={handleOnChangeRecipient}
          onChangeSelectCcRecipient={handleOnChangeCcRecipient}
          onChangeSelectBccRecipient={handleOnChangeBccRecipient}
          className="mx-4"
        />
        <div className={twMerge('mx-2 flex-1 overflow-auto')}>
          <WriterCompose
            isShowToolbar={false}
            id="compose"
            data={content}
            handleChangeEditor={handleChangeEditor}
            handleChangeBlur={undefined}
            isLoading={undefined}
            isDisabled={undefined}
          />
        </div>
        {files.length !== 0 && (
          <>
            <p className="px-4 font-semibold">{`${t('attachment')}: ${files.length}`}</p>
            <div className="grid grid-cols-2 gap-4 px-4 py-4">
              {files.map((item: FileType) => (
                <div key={item.id} className="col-span-1">
                  <FileItemMobile id={item.id} file={item.file} onRemove={handleRemoveFileItem} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default ComposeModalMobile;
