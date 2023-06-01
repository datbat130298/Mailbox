import _ from 'lodash';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CgFormatColor } from 'react-icons/cg';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiLink2, FiMoreVertical } from 'react-icons/fi';
import { IoMdAttach } from 'react-icons/io';
import { IoImageOutline } from 'react-icons/io5';
import { MdTagFaces } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import ComposePopupButtonSend from './Components/ComposePopupButtonSend';
import ComposePopupHeader from './Components/ComposePopupHeader';
import ComposePopupInput from './Components/ComposePopupInput';
import ComposePopupSelectTimeModal from './Components/ComposePopupSelectTimeModal';
import ComposePopupToolbarItem from './Components/ComposePopupToolbarItem';
import WriterCompose from './Components/EditorWriterCompose';

export interface ComposePopupProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const ComposePopup = ({ isOpen, setOpen }: ComposePopupProps) => {
  const [isVisibleToolbar, setIsVisibleToolbar] = useState<boolean>(false);
  const [receiver, setReceiver] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [debounceSubject, setDebounceSubject] = useState<string>('');
  const [isZoomIn, setIsZoomIn] = useState<boolean>(false);
  const [isShowSelectTimeModal, setIsShowSelectTimeModal] = useState<boolean>(false);

  const { t } = useTranslation();

  const onChangeReceiverInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiver(e.target.value);
  };

  const debounceInput = useCallback(
    _.debounce((_searchVal: string) => {
      setDebounceSubject(_searchVal);
    }, 1000),
    [],
  );

  const onChangeSubjectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
    debounceInput(e.target.value);
  };

  const handleClickDeleteFooter = () => {
    // eslint-disable-next-line no-console
    console.log('this is click delete');
  };

  const handleClickCollect = () => {
    if (!isZoomIn) {
      setIsZoomIn(true);
      setOpen(false);
      return;
    }
    setIsZoomIn(false);
    setOpen(true);
  };

  const handleClickFormat = () => {
    const toolbarCk = document.querySelectorAll<HTMLElement>('.ck.ck-toolbar');
    if (!isVisibleToolbar) {
      setIsVisibleToolbar(true);
      toolbarCk[0].style.visibility = 'hidden';
      return;
    }
    toolbarCk[0].style.visibility = 'visible';
    setIsVisibleToolbar(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setIsVisibleToolbar(true);
    }
  }, [isOpen]);

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

  return (
    <div>
      {isOpen && (
        <div
          className={twMerge(
            'fixed bottom-0 right-8 z-50 h-[610px] w-[540px] rounded-t-md bg-white shadow-compose',
          )}
        >
          <ComposePopupHeader
            title={debounceSubject}
            onClose={() => setOpen(false)}
            onCollect={handleClickCollect}
          />
          <div className="mt-0.5 px-2">
            <ComposePopupInput
              id="receiver"
              label={t('recipients')}
              value={receiver}
              onChange={onChangeReceiverInput}
            />
            <ComposePopupInput label={t('subject')} value={subject} onChange={onChangeSubjectInput} />
          </div>
          <div className="mx-2 h-[450px]">
            <WriterCompose
              data={undefined}
              handleChangeEditor={undefined}
              handleChangeBlur={undefined}
              isLoading={undefined}
              isDisabled={undefined}
            />
          </div>
          <div className="relative bottom-4 flex w-full items-center justify-between px-4">
            <div className="flex justify-start gap-4">
              <ComposePopupButtonSend
                onClickSend={handleClickSend}
                onClickArrow={handleClickArrow}
                onClickSendWithTime={handleClickSendWihTime}
              />
              <div className="flex w-full items-center justify-start">
                <ComposePopupToolbarItem
                  isActive={!isVisibleToolbar}
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
        </div>
      )}
      {!isOpen && isZoomIn && (
        <div
          className={twMerge(
            'fixed -bottom-[1px] right-12 z-50 h-fit w-[280px] rounded-t-md bg-white shadow-compose',
          )}
        >
          <ComposePopupHeader
            className=" bg-[#F2F6FC]"
            title={debounceSubject}
            onClose={() => {
              setOpen(false);
              setIsZoomIn(false);
            }}
            onCollect={handleClickCollect}
          />
        </div>
      )}
      <ComposePopupSelectTimeModal
        isOpen={isShowSelectTimeModal}
        setOpen={setIsShowSelectTimeModal}
        onSubmit={handleSubmitSchedule}
      />
    </div>
  );
};

export default ComposePopup;
