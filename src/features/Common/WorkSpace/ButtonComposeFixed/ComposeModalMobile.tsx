import _ from 'lodash';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MultiValue } from 'react-select';
import ComposePopup from '../../Components/ComposePopup/Components/ComposePopup';
import { OptionLabel } from '../../Components/ComposePopup/Components/ComposePopupRecipient/ComposePopupSelectRecipients';
import Modal from '../../Components/Modal/Modal';

interface ComposeModalMobileProp {
  isOpen: boolean;
  onClose: () => void;
}

const ComposeModalMobile = ({ isOpen, onClose }: ComposeModalMobileProp) => {
  const [subject, setSubject] = useState<string>('');
  const [debounceSubject, setDebounceSubject] = useState<string>('');
  const [selectedRecipient, setSelectedRecipient] = useState<readonly OptionLabel[] | undefined>([]);
  const [selectedCcRecipient, setSelectedCcRecipient] = useState<readonly OptionLabel[] | undefined>([]);
  const [selectedBccRecipient, setSelectedBccRecipient] = useState<readonly OptionLabel[] | undefined>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [content, setContent] = useState<any>(' ');

  const { t } = useTranslation();

  const handleOnChangeRecipient = (selectedOptions: MultiValue<OptionLabel>) =>
    setSelectedRecipient(selectedOptions);

  const handleOnChangeCcRecipient = (selectedOptions: MultiValue<OptionLabel>) =>
    setSelectedCcRecipient(selectedOptions);

  const handleOnChangeBccRecipient = (selectedOptions: MultiValue<OptionLabel>) =>
    setSelectedBccRecipient(selectedOptions);

  const handleChangeEditor = (value: string) => {
    if (content) {
      return;
    }
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isShowFooter={false}
      isShowHeader={false}
      className="overflow-hidden rounded-none"
      contentContainerClassName="p-0 h-screen w-screen rounded-none"
    >
      <div className="flex h-10 w-full items-center justify-between border-b-[0.5px] px-2">
        <div className="line-clamp-1 w-[calc(100%-50px)] truncate text-ellipsis break-all pl-2 text-sm font-semibold">
          {debounceSubject || t('new_message')}
        </div>
        <div
          className="flex h-6 w-fit items-center justify-center rounded-full text-sm underline hover:bg-slate-200"
          role="button"
          tabIndex={0}
          onClick={onClose}
        >
          Back
        </div>
      </div>
      <ComposePopup
        onClose={onClose}
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
        isShowToolbar
        subject={subject}
        composePopupStyle={{
          containerClassName: 'h-[calc(100%-52px)] w-full rounded-t-none shadow-none',
          composeClassName: 'h-[calc(100%-140px)]',
        }}
      />
    </Modal>
  );
};

export default ComposeModalMobile;
