import _ from 'lodash';
import { Dispatch, SetStateAction, useCallback, useContext, useEffect, useState } from 'react';
import { MultiValue } from 'react-select';
import { twMerge } from 'tailwind-merge';
import ContextDraft from '../../../../app/Context/Context';
import { ComposeViewTypeEnum } from '../../../../app/Enums/commonEnums';
import { ComposePopupStyleType, ComposeType, MailType } from '../../../../app/Types/commonTypes';
import Modal from '../Modal/Modal';
import ComposePopup from './Components/ComposePopup';
import ComposePopupHeader from './Components/ComposePopupHeader';
import { OptionLabel } from './Components/ComposePopupRecipient/ComposePopupSelectRecipients';

interface ComposePopupContainerProps {
  compose?: ComposeType;
  isShowComposePopup?: boolean;
  fromMail?: MailType;
  onClear?: () => void;
  composePopupStyle?: ComposePopupStyleType;
  composeClassName?: string;
  composeViewType?: ComposeViewTypeEnum;
  setComposeViewType?: Dispatch<SetStateAction<ComposeViewTypeEnum>>;
}

const ComposePopupContainer = ({
  setComposeViewType,
  composeViewType,
  compose,
  isShowComposePopup,
  fromMail,
  onClear,
  composePopupStyle,
  composeClassName,
}: ComposePopupContainerProps) => {
  const [subject, setSubject] = useState<string>('');
  const [debounceSubject, setDebounceSubject] = useState<string>('');
  const [selectedRecipient, setSelectedRecipient] = useState<readonly OptionLabel[] | undefined>([]);
  const [selectedCcRecipient, setSelectedCcRecipient] = useState<readonly OptionLabel[] | undefined>([]);
  const [selectedBccRecipient, setSelectedBccRecipient] = useState<readonly OptionLabel[] | undefined>([]);
  const [isShowCompose, setIsShowCompose] = useState<boolean>(false);
  const [content, setContent] = useState<string>(' ');
  const [isZoomIn, setIsZoomIn] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);

  const { handleShowCompose, handleChangeViewType, handleClickCloseComposeItem } = useContext(ContextDraft);

  const handleOnChangeRecipient = (selectedOptions: MultiValue<OptionLabel>) =>
    setSelectedRecipient(selectedOptions);
  const handleOnChangeCcRecipient = (selectedOptions: MultiValue<OptionLabel>) =>
    setSelectedCcRecipient(selectedOptions);
  const handleOnChangeBccRecipient = (selectedOptions: MultiValue<OptionLabel>) =>
    setSelectedBccRecipient(selectedOptions);
  const handleChangeEditor = (value: string) => {
    setContent(value);
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

  const handleClickCollect = () => {
    if (!isZoomIn) {
      handleShowCompose(compose?.uuid || 0, false);
      setIsZoomIn(true);
      return;
    }
    setIsZoomIn(false);
    handleShowCompose(compose?.uuid || 0, true);
  };

  const handleChangeViewTypeToModal = () => {
    setIsZoomIn(false);
    setIsModal(false);
    handleShowCompose(compose?.uuid || 0, true);
    handleChangeViewType(compose?.uuid || 0, ComposeViewTypeEnum.POPUP);
  };

  const handleClosePopupDraftList = () => {
    setIsShowCompose(false);
    setIsZoomIn(false);
  };

  const handleCloseModal = () => {
    handleClickCloseComposeItem(compose?.uuid || 0);
  };

  const handleCloseModalOutside = () => {
    setIsModal(false);
  };

  const handleClosePopupZoomIn = () => {
    handleClickCloseComposeItem(compose?.uuid || 0);
  };

  const handleClosePopup = () => {
    handleClickCloseComposeItem(compose?.uuid || 0);
  };

  useEffect(() => {
    if (compose) {
      setSelectedBccRecipient(compose?.recipientBcc);
      setSelectedCcRecipient(compose?.recipientCc);
      setSelectedRecipient(compose?.recipient);
      setDebounceSubject('');
      setContent('');
      setSubject('');
    }
  }, [compose]);

  useEffect(() => {
    if (!_.isEmpty(fromMail)) {
      setSubject(fromMail.subject);
      setDebounceSubject(fromMail.subject);
    }
  }, [fromMail]);

  useEffect(() => {
    setIsShowCompose(true);
    if (localStorage.getItem('defaultFullScreen') && localStorage.getItem('defaultFullScreen') === 'true') {
      handleChangeViewType(compose?.uuid || 0, ComposeViewTypeEnum.MODAL);
    } else {
      handleChangeViewType(compose?.uuid || 0, ComposeViewTypeEnum.POPUP);
    }
  }, []);

  return (
    <>
      {isShowComposePopup &&
        (composeViewType === ComposeViewTypeEnum.REPLY ||
          composeViewType === ComposeViewTypeEnum.FORWARD) && (
          <ComposePopup
            content={content}
            onChangeEditor={handleChangeEditor}
            selectRecipient={selectedRecipient || undefined}
            selectedCcRecipient={selectedCcRecipient || undefined}
            selectedBccRecipient={selectedBccRecipient || undefined}
            onChangeSelectRecipient={handleOnChangeRecipient}
            onChangeSelectCcRecipient={handleOnChangeCcRecipient}
            onChangeSelectBccRecipient={handleOnChangeBccRecipient}
            onChangeSubjectInput={onChangeSubjectInput}
            debounceSubject={debounceSubject}
            subject={subject}
            onCollect={handleClickCollect}
            viewType={composeViewType}
            onClose={handleClosePopup}
            fromMail={fromMail}
            onClear={onClear}
            composePopupStyle={composePopupStyle}
            setComposeViewType={setComposeViewType}
            composeClassName={composeClassName || ''}
          />
        )}
      {compose &&
        compose.isShow &&
        !isModal &&
        isShowCompose &&
        compose.viewType === ComposeViewTypeEnum.POPUP && (
          <ComposePopup
            content={content}
            onChangeEditor={handleChangeEditor}
            selectRecipient={selectedRecipient || undefined}
            selectedCcRecipient={selectedCcRecipient || undefined}
            selectedBccRecipient={selectedBccRecipient || undefined}
            onChangeSelectRecipient={handleOnChangeRecipient}
            onChangeSelectCcRecipient={handleOnChangeCcRecipient}
            onChangeSelectBccRecipient={handleOnChangeBccRecipient}
            onChangeSubjectInput={onChangeSubjectInput}
            debounceSubject={debounceSubject}
            subject={subject}
            onCollect={handleClickCollect}
            viewType={compose.viewType}
            onClose={handleClosePopupDraftList}
            fromMail={fromMail}
            onClear={onClear}
            composePopupStyle={composePopupStyle}
            id={compose.uuid}
            composeClassName={composeClassName || ''}
            setIsModal={setIsModal}
          />
        )}
      {compose && compose.isShow && isModal && compose.viewType === ComposeViewTypeEnum.MODAL && (
        <Modal
          isShowFooter={false}
          isShowHeader={false}
          onClose={handleCloseModalOutside}
          isOpen={compose.isShow && isShowCompose && compose.viewType === ComposeViewTypeEnum.MODAL}
          contentContainerClassName="w-[80vw] h-[90vh] bg-white p-0 rounded-lg"
        >
          <ComposePopup
            content={content}
            onChangeEditor={handleChangeEditor}
            selectRecipient={selectedRecipient}
            selectedCcRecipient={selectedCcRecipient}
            selectedBccRecipient={selectedBccRecipient}
            onChangeSelectRecipient={handleOnChangeRecipient}
            onChangeSelectCcRecipient={handleOnChangeCcRecipient}
            onChangeSelectBccRecipient={handleOnChangeBccRecipient}
            onChangeSubjectInput={onChangeSubjectInput}
            debounceSubject={debounceSubject}
            subject={subject}
            onCollect={handleClickCollect}
            onClose={handleCloseModal}
            onClear={onClear}
            viewType={compose.viewType}
            id={compose.uuid}
            setIsModal={setIsModal}
            composePopupStyle={{
              containerClassName: 'absolute left-0 top-0 w-full h-full',
              composeClassName: '',
            }}
          />
        </Modal>
      )}
      {compose && !compose.isShow && isZoomIn && (
        <div className={twMerge('z-50 h-fit min-w-[280px] rounded-t-md bg-white shadow-compose')}>
          <ComposePopupHeader
            className=" bg-[#F2F6FC]"
            onChangeViewType={handleChangeViewTypeToModal}
            title={debounceSubject}
            onClose={handleClosePopupZoomIn}
            onCollect={handleClickCollect}
          />
        </div>
      )}
    </>
  );
};

export default ComposePopupContainer;
