import _ from 'lodash';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { ComposeViewTypeEnum } from '../../../../app/Enums/commonEnums';
import { ComposePopupStyleType, MailType } from '../../../../app/Types/commonTypes';
import Modal from '../Modal/Modal';
import ComposePopup from './Components/ComposePopup';
import ComposePopupHeader from './Components/ComposePopupHeader';

interface ComposePopupContainerProps {
  isShowComposePopup: boolean;
  setIsShowComposePopup: Dispatch<SetStateAction<boolean>>;
  fromMail?: MailType;
  onClear?: () => void;
  composePopupStyle?: ComposePopupStyleType;
  composeViewType: ComposeViewTypeEnum;
  setComposeViewType: Dispatch<SetStateAction<ComposeViewTypeEnum>>;
  composeClassName?: string;
}

const ComposePopupContainer = ({
  isShowComposePopup,
  setIsShowComposePopup,
  fromMail,
  onClear,
  composePopupStyle,
  composeViewType,
  setComposeViewType,
  composeClassName,
}: ComposePopupContainerProps) => {
  const [isZoomIn, setIsZoomIn] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>('');
  const [receiver, setReceiver] = useState<string>('');
  const [debounceSubject, setDebounceSubject] = useState<string>('');

  const handleClose = () => {
    setIsShowComposePopup(false);
    if (onClear) {
      onClear();
    }
  };

  const debounceInput = useCallback(
    _.debounce((_searchVal: string) => {
      setDebounceSubject(_searchVal);
    }, 1000),
    [],
  );

  const onChangeReceiverInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReceiver(e.target.value);
  };

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

  const handleChangeViewType = () => {
    setComposeViewType(ComposeViewTypeEnum.POPUP);
    setIsShowComposePopup(true);
  };

  useEffect(() => {
    if (!_.isEmpty(fromMail)) {
      setReceiver(fromMail?.from_user?.email || '');
      setSubject(fromMail.subject);
      setDebounceSubject(fromMail.subject);
    }
  }, [fromMail]);

  return (
    <>
      {isShowComposePopup &&
        (composeViewType === ComposeViewTypeEnum.POPUP ||
          composeViewType === ComposeViewTypeEnum.REPLY ||
          composeViewType === ComposeViewTypeEnum.FORWARD) && (
          <ComposePopup
            onChangeSubjectInput={onChangeSubjectInput}
            onChangeReceiverInput={onChangeReceiverInput}
            debounceSubject={debounceSubject}
            subject={subject}
            receiver={receiver}
            onCollect={handleClickCollect}
            viewType={composeViewType}
            onClose={handleClose}
            fromMail={fromMail}
            onClear={onClear}
            composePopupStyle={composePopupStyle}
            setViewType={setComposeViewType}
            composeClassName={composeClassName}
          />
        )}
      {isShowComposePopup && composeViewType === ComposeViewTypeEnum.MODAL && (
        <Modal
          isShowFooter={false}
          isShowHeader={false}
          onClose={handleClose}
          isOpen={isShowComposePopup}
          contentContainerClassName="w-[80vw] h-[90vh] bg-white p-0 rounded-lg"
        >
          <ComposePopup
            onChangeSubjectInput={onChangeSubjectInput}
            onChangeReceiverInput={onChangeReceiverInput}
            debounceSubject={debounceSubject}
            subject={subject}
            receiver={receiver}
            onCollect={handleClickCollect}
            onClose={handleClose}
            onClear={onClear}
            viewType={composeViewType}
            setViewType={setComposeViewType}
            composePopupStyle={{
              containerClassName: 'absolute left-0 top-0 w-full h-full',
              composeClassName: '',
            }}
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
            onChangeViewType={handleChangeViewType}
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
