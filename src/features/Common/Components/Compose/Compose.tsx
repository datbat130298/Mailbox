import _ from 'lodash';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { CgFormatColor } from 'react-icons/cg';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiLink2, FiMoreVertical } from 'react-icons/fi';
import { IoMdAttach } from 'react-icons/io';
import { IoImageOutline } from 'react-icons/io5';
import { MdTagFaces } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';
import Button from '../Button';
import ComposeHeader from './ComposeHeader';
import ComposeInput from './ComposeInput';
import ComposeToolbarItem from './ComposeToolbarItem';
import WriterCompose from './EditorWriterCompose';

export interface ComposeProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Compose = ({ isOpen, setOpen }: ComposeProps) => {
  const [isVisibleToolbar, setIsVisibleToolbar] = useState<boolean>(false);
  const [receiver, setReceiver] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [debounceSubject, setDebounceSubject] = useState<string>('');
  const [isZoomIn, setIsZoomIn] = useState<boolean>(false);

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

  return (
    <div>
      {isOpen && (
        <div
          className={twMerge(
            'fixed bottom-0 right-8 z-50 h-[610px] w-[540px] rounded-t-md bg-white shadow-compose',
          )}
        >
          <ComposeHeader
            title={debounceSubject}
            onClose={() => setOpen(false)}
            onCollect={() => handleClickCollect()}
          />
          <div className="mt-0.5 px-2">
            <ComposeInput id="receiver" label="Receiver" value={receiver} onChange={onChangeReceiverInput} />
            <ComposeInput label="Subject" value={subject} onChange={onChangeSubjectInput} />
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
              <Button color="gray" className="w-15 h-8 items-center rounded-full">
                SEND
              </Button>
              <div className="flex w-full items-center justify-start">
                <ComposeToolbarItem
                  isActive={!isVisibleToolbar}
                  title="custom format"
                  icon={<CgFormatColor size={20} />}
                  onClick={handleClickFormat}
                />
                <ComposeToolbarItem
                  title="import file"
                  icon={<IoMdAttach size={19} />}
                  onClick={handleClickFormat}
                />
                <ComposeToolbarItem
                  title="import link"
                  icon={<FiLink2 size={19} />}
                  onClick={handleClickFormat}
                />
                <ComposeToolbarItem
                  title="import emoticon"
                  icon={<MdTagFaces size={19} />}
                  onClick={handleClickFormat}
                />
                <ComposeToolbarItem
                  title="import image"
                  icon={<IoImageOutline size={19} />}
                  onClick={handleClickFormat}
                />
                <ComposeToolbarItem
                  title="more"
                  icon={<FiMoreVertical size={19} />}
                  onClick={handleClickFormat}
                />
              </div>
            </div>
            <div
              className="flex h-5 w-5 items-center justify-center rounded-lg hover:bg-gray-200"
              role="button"
              tabIndex={0}
              onClick={handleClickDeleteFooter}
            >
              <FaRegTrashAlt />
            </div>
          </div>
        </div>
      )}
      {!isOpen && isZoomIn && (
        <div
          className={twMerge(
            'fixed -bottom-[1px] right-12 z-50 h-fit w-[280px] rounded-t-md bg-white shadow-compose',
          )}
        >
          <ComposeHeader
            className=" bg-[#F2F6FC]"
            title={debounceSubject}
            onClose={() => {
              setOpen(false);
              setIsZoomIn(false);
            }}
            onCollect={() => handleClickCollect()}
          />
        </div>
      )}
    </div>
  );
};

export default Compose;
