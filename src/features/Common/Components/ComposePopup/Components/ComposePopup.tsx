import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgFormatColor } from 'react-icons/cg';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiLink2, FiMoreVertical } from 'react-icons/fi';
import { IoMdAttach } from 'react-icons/io';
import { IoImageOutline } from 'react-icons/io5';
import { MdTagFaces } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import ComposePopupButtonSend from './ComposePopupButtonSend';
import ComposePopupHeader from './ComposePopupHeader';
import ComposePopupInput from './ComposePopupInput';
import ComposePopupSelectTimeModal from './ComposePopupSelectTimeModal';
import ComposePopupToolbarItem from './ComposePopupToolbarItem';
import WriterCompose from './EditorWriterCompose';

export interface ComposePopupProps {
  onClickViewType: () => void;
  viewType?: string;
  onClose: () => void;
  onCollect: () => void;
  subject: string;
  onChangeSubjectInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  debounceSubject: string;
}

const ComposePopup = ({
  onChangeSubjectInput,
  subject,
  onClose,
  onClickViewType,
  viewType,
  onCollect,
  debounceSubject,
}: ComposePopupProps) => {
  const [isVisibleToolbar, setIsVisibleToolbar] = useState<boolean>(false);
  const [receiver, setReceiver] = useState<string>('');
  const [isShowSelectTimeModal, setIsShowSelectTimeModal] = useState<boolean>(false);

  const { t } = useTranslation();

  const onChangeReceiverInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiver(e.target.value);
  };

  const handleClickDeleteFooter = () => {
    // eslint-disable-next-line no-console
    console.log('this is click delete');
  };

  useEffect(() => {
    const toolbar = document.querySelector<HTMLElement>('.ck.ck-toolbar');
    if (toolbar) {
      if (!isVisibleToolbar) {
        toolbar.style.visibility = 'hidden';
        return;
      }
      toolbar.style.visibility = 'visible';
    }
  }, [isVisibleToolbar, viewType]);

  const handleClickFormat = () => {
    setIsVisibleToolbar((prev) => !prev);
  };

  const handleClickSend = () => {
    // eslint-disable-next-line no-console
    console.log('this is Send');
  };

  const handleClickArrow = () => {
    // eslint-disable-next-line no-console
    console.log('this is Arrow');
  };

  const handleClickSendWihTime = () => {
    // eslint-disable-next-line no-console
    console.log('this is SendWithTime');
    setIsShowSelectTimeModal(true);
  };

  const handleSubmitSchedule = () => {
    // eslint-disable-next-line no-console
    console.log('this is SubmitSchudule');
  };

  const handleClickViewType = () => {
    onClickViewType();
  };

  useEffect(() => {
    setTimeout(() => {
      if (viewType === 'fullscreen') {
        setIsVisibleToolbar(true);
      }
    }, 100);
  }, [viewType]);

  return (
    <div>
      <ComposePopupHeader
        title={debounceSubject}
        onClose={onClose}
        onCollect={onCollect}
        onChangeViewType={handleClickViewType}
      />
      <div className="mt-0.5 px-2">
        <ComposePopupInput label={t('recipients')} value={receiver} onChange={onChangeReceiverInput} />
        <ComposePopupInput label={t('subject')} value={subject} onChange={onChangeSubjectInput} />
      </div>
      <div className={twMerge('mx-2 h-[450px]', viewType === 'fullscreen' && 'h-[73vh]')}>
        <WriterCompose
          data={undefined}
          handleChangeEditor={undefined}
          handleChangeBlur={undefined}
          isLoading={undefined}
          isDisabled={undefined}
        />
      </div>
      <div className={twMerge('relative bottom-4 flex w-full items-center justify-between px-4')}>
        <div className="flex justify-start gap-4">
          <ComposePopupButtonSend
            onClickSend={handleClickSend}
            onClickArrow={handleClickArrow}
            onClickSendWithTime={handleClickSendWihTime}
          />
          <div className="flex w-full items-center justify-start">
            <ComposePopupToolbarItem
              id="format"
              isActive={isVisibleToolbar}
              title={t('format_options')}
              icon={<CgFormatColor size={20} />}
              onClick={handleClickFormat}
            />
            <ComposePopupToolbarItem
              title={t('attach_files')}
              icon={<IoMdAttach size={19} />}
              onClick={handleClickFormat}
            />
            <ComposePopupToolbarItem
              title={t('insert_link')}
              icon={<FiLink2 size={19} />}
              onClick={handleClickFormat}
            />
            <ComposePopupToolbarItem
              title={t('insert_emotion')}
              icon={<MdTagFaces size={19} />}
              onClick={handleClickFormat}
            />
            <ComposePopupToolbarItem
              title={t('insert_photo')}
              icon={<IoImageOutline size={19} />}
              onClick={handleClickFormat}
            />
            <ComposePopupToolbarItem
              title={t('more')}
              icon={<FiMoreVertical size={19} />}
              onClick={handleClickFormat}
            />
          </div>
        </div>

        <ComposePopupToolbarItem
          onClick={handleClickDeleteFooter}
          title={t('discard_draft')}
          icon={<FaRegTrashAlt size={14} className="ml-0.5" />}
        />
      </div>

      <ComposePopupSelectTimeModal
        isOpen={isShowSelectTimeModal}
        setOpen={setIsShowSelectTimeModal}
        onSubmit={handleSubmitSchedule}
      />
    </div>
  );
};

export default ComposePopup;
