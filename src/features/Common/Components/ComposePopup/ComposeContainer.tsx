import _ from 'lodash';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Modal from '../Modal/Modal';
import ComposePopup from './Components/ComposePopup';
import ComposePopupHeader from './Components/ComposePopupHeader';

interface ComposePopupContainerProps {
  isShowComposePopup: boolean;
  setIsShowComposePopup: Dispatch<SetStateAction<boolean>>;
}

const ComposePopupContainer = ({ isShowComposePopup, setIsShowComposePopup }: ComposePopupContainerProps) => {
  const [viewType, setViewType] = useState<string>('popup');
  const [isZoomIn, setIsZoomIn] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>('');
  const [debounceSubject, setDebounceSubject] = useState<string>('');

  const handleClose = () => {
    setIsShowComposePopup(false);
  };

  const onClickViewType = () => {
    if (viewType === 'popup') {
      setViewType('fullscreen');
      return;
    }
    setViewType('popup');
  };

  useEffect(() => {
    if (!isShowComposePopup) setViewType('popup');
  }, [isShowComposePopup]);

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

  const handleClickCollect = () => {
    if (!isZoomIn) {
      setIsZoomIn(true);
      handleClose();
      return;
    }
    setIsZoomIn(false);
    setIsShowComposePopup(true);
  };

  const handleClickViewType = () => {
    setViewType('popup');
    setIsShowComposePopup(true);
  };

  return (
    <>
      {isShowComposePopup && viewType === 'popup' && (
        <div
          className={twMerge(
            'fixed bottom-0 right-8 z-50 h-[610px] w-[540px] rounded-t-md bg-white shadow-compose',
          )}
        >
          <ComposePopup
            onChangeSubjectInput={onChangeSubjectInput}
            debounceSubject={debounceSubject}
            subject={subject}
            onCollect={handleClickCollect}
            onClickViewType={onClickViewType}
            viewType={viewType}
            onClose={handleClose}
          />
        </div>
      )}
      {isShowComposePopup && viewType === 'fullscreen' && (
        <Modal
          isShowFooter={false}
          isShowHeader={false}
          onClose={handleClose}
          isOpen={isShowComposePopup}
          contentContainerClassName="w-[80vw] h-[90vh] bg-white p-0 rounded-lg"
        >
          <ComposePopup
            onChangeSubjectInput={onChangeSubjectInput}
            debounceSubject={debounceSubject}
            subject={subject}
            onCollect={handleClickCollect}
            onClose={handleClose}
            onClickViewType={onClickViewType}
            viewType={viewType}
          />
        </Modal>
      )}
      {!isShowComposePopup && isZoomIn && (
        <div
          className={twMerge(
            'fixed bottom-0 right-12 z-50 h-fit w-[280px] rounded-t-md bg-white shadow-compose',
          )}
        >
          <ComposePopupHeader
            className=" bg-[#F2F6FC]"
            onChangeViewType={handleClickViewType}
            title={debounceSubject}
            onClose={() => {
              handleClose();
              setIsZoomIn(false);
            }}
            onCollect={handleClickCollect}
          />
        </div>
      )}
    </>
  );
};

export default ComposePopupContainer;
