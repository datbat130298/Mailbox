import _ from 'lodash';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { MultiValue } from 'react-select';
import { twMerge } from 'tailwind-merge';
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
  id?: number;
  setComposeDraftList: Dispatch<SetStateAction<ComposeType[]>>;
  handleShowCompose: (id: number, data: boolean) => void;
  composeDraftList: ComposeType[];
  handleClickCloseComposeItem?: (id: number) => void;
  viewType?: ComposeViewTypeEnum;
}

const ComposePopupContainer = ({
  handleClickCloseComposeItem,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  composeDraftList,
  handleShowCompose,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setComposeDraftList,
  viewType,
  compose,
  id,
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
  const [composeViewType, setComposeViewType] = useState(viewType || ComposeViewTypeEnum.POPUP);
  const [isShowCompose, setIsShowCompose] = useState<boolean>(false);
  const [content, setContent] = useState<string>(' ');
  const [isZoomIn, setIsZoomIn] = useState<boolean>(false);

  const handleOnChangeRecipient = (selectedOptions: MultiValue<OptionLabel>) =>
    setSelectedRecipient(selectedOptions);
  const handleOnChangeCcRecipient = (selectedOptions: MultiValue<OptionLabel>) =>
    setSelectedCcRecipient(selectedOptions);
  const handleOnChangeBccRecipient = (selectedOptions: MultiValue<OptionLabel>) =>
    setSelectedBccRecipient(selectedOptions);
  const handleChangeEditor = (value: string) => {
    setContent(value);
  };

  const handleClose = () => {
    setIsShowCompose(false);
    if (_.isFunction(handleClickCloseComposeItem)) {
      handleClickCloseComposeItem(id || 0);
    }
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

  const onChangeSubjectInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
    debounceInput(e.target.value);
  };

  const handleClickCollect = () => {
    if (!isZoomIn) {
      handleShowCompose(id || 0, false);
      setIsZoomIn(true);
      return;
    }
    setIsZoomIn(false);
    handleShowCompose(id || 0, true);
  };

  const handleChangeViewType = () => {
    setComposeViewType(ComposeViewTypeEnum.POPUP);
    handleShowCompose(id || 0, true);
  };

  const handleClosePopup = () => {
    if (_.isFunction(handleClickCloseComposeItem)) {
      handleClickCloseComposeItem(id || 0);
    }

    setIsZoomIn(false);
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

  const handleClosePopupDraftList = () => {
    setIsShowCompose(false);
    if (_.isFunction(handleClickCloseComposeItem)) {
      handleClickCloseComposeItem(id || 0);
    }
  };

  useEffect(() => {
    if (!_.isEmpty(fromMail)) {
      setSubject(fromMail.subject);
      setDebounceSubject(fromMail.subject);
    }
  }, [fromMail]);

  useEffect(() => {
    if (viewType) {
      setComposeViewType(viewType);
    }
  }, [viewType]);

  useEffect(() => {
    setIsShowCompose(true);
    if (localStorage.getItem('defaultFullScreen') && localStorage.getItem('defaultFullScreen') === 'true') {
      setComposeViewType(ComposeViewTypeEnum.MODAL);
    } else {
      setComposeViewType(ComposeViewTypeEnum.POPUP);
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
            setViewType={setComposeViewType}
            composeClassName={composeClassName || ''}
          />
        )}
      {((compose && compose.isShow) || isShowComposePopup) &&
      isShowCompose &&
      composeViewType === ComposeViewTypeEnum.POPUP ? (
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
          onClose={handleClosePopupDraftList}
          fromMail={fromMail}
          onClear={onClear}
          composePopupStyle={composePopupStyle}
          setViewType={setComposeViewType}
          composeClassName={composeClassName || ''}
        />
      ) : (
        ''
      )}
      {compose && compose.isShow && isShowCompose && composeViewType === ComposeViewTypeEnum.MODAL && (
        <Modal
          isShowFooter={false}
          isShowHeader={false}
          onClose={handleClose}
          isOpen={compose?.isShow}
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
      {compose && !compose.isShow && isZoomIn && (
        <div className={twMerge('z-50 h-fit min-w-[280px] rounded-t-md bg-white shadow-compose')}>
          <ComposePopupHeader
            className=" bg-[#F2F6FC]"
            onChangeViewType={handleChangeViewType}
            title={debounceSubject}
            onClose={handleClosePopup}
            onCollect={handleClickCollect}
          />
        </div>
      )}
    </>
  );
};

export default ComposePopupContainer;
