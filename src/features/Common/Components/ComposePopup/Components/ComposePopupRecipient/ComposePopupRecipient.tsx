import _ from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MultiValue } from 'react-select';
import { twMerge } from 'tailwind-merge';
import { getContacts } from '../../../../../../app/Services/Contact/Contact';
import { ContactType } from '../../../../../../app/Types/commonTypes';
import { triggerClickOutside } from '../../../../../utils/helpers';
import ComposePopupSelectRecipients, { OptionLabel } from './ComposePopupSelectRecipients';

const ComposePopupRecipient = () => {
  const [viewText, setViewText] = useState<boolean>(true);
  const [contacts, setContacts] = useState<Array<ContactType>>([]);
  const [selected, setSelected] = useState<readonly OptionLabel[]>([]);
  const [isShowCcInput, setIsShowCcInput] = useState<boolean>(false);
  const [selectedCcInput, setSelectedCcInput] = useState<readonly OptionLabel[]>([]);
  const [selectedBccInput, setSelectedBccInput] = useState<readonly OptionLabel[]>([]);
  const [isShowBccInput, setIsShowBccInput] = useState<boolean>(false);
  const recipientRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  const handleClickCc = () => {
    setIsShowCcInput(true);
  };

  const handleClickBcc = () => {
    setIsShowBccInput(true);
  };

  const handleClickRecipient = () => {
    setViewText(false);
  };

  useEffect(() => {
    triggerClickOutside(recipientRef, () => setViewText(true));
  }, [recipientRef, triggerClickOutside]);

  const fetchData = useCallback(() => {
    getContacts().then((data: Array<ContactType>) => {
      setContacts(data);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const transferString = useMemo(() => {
    const array = selected.concat(selectedCcInput, selectedBccInput);
    const string = array.map((item: OptionLabel) => item.label);
    return string.join(', ');
  }, [selected, selectedCcInput, selectedBccInput]);

  const options = useMemo(() => {
    return contacts.map((contact) => ({
      value: contact.id,
      label: contact.email,
      avatar: contact.avatar,
    }));
  }, [contacts]);

  const handleOnChange = (selectedOptions: MultiValue<OptionLabel>) => setSelected(selectedOptions);
  const handleOnChangeCcInput = (selectedOptions: MultiValue<OptionLabel>) =>
    setSelectedCcInput(selectedOptions);
  const handleOnChangeBccInput = (selectedOptions: MultiValue<OptionLabel>) =>
    setSelectedBccInput(selectedOptions);

  useEffect(() => {
    if (_.isEmpty(selectedCcInput)) {
      setIsShowCcInput(false);
    }
    if (_.isEmpty(selectedBccInput)) {
      setIsShowBccInput(false);
    }
  }, [viewText]);

  return (
    <div ref={recipientRef}>
      {viewText && (
        <div
          className="mx-2 my-1 flex items-center gap-2 border-b-[1px] border-gray-200 py-2 pb-3"
          role="button"
          tabIndex={0}
          onClick={handleClickRecipient}
        >
          {_.isEmpty(transferString) ? (
            <span className="text-sm text-[#9CA3AF]">{t('recipients')}</span>
          ) : (
            <span className="text-sm">{transferString}</span>
          )}
        </div>
      )}
      {!viewText && (
        <div
          className={twMerge(
            'mx-1 flex flex-col items-center border-b-[1px] border-gray-200 px-1 py-0',
            _.isEmpty(selected) && 'mx-2 flex-row items-center',
            (isShowBccInput || isShowCcInput) && 'mx-1 flex-col ',
          )}
        >
          <ComposePopupSelectRecipients
            label={t('to')}
            options={options}
            defaultValue={selected}
            onChange={handleOnChange}
          />
          {isShowCcInput && (
            <ComposePopupSelectRecipients
              className="-mt-1.5"
              label={t('cc')}
              options={options}
              defaultValue={selectedCcInput}
              onChange={handleOnChangeCcInput}
            />
          )}
          {isShowBccInput && (
            <ComposePopupSelectRecipients
              className="-mt-1.5"
              label={t('bcc')}
              options={options}
              defaultValue={selectedBccInput}
              onChange={handleOnChangeBccInput}
            />
          )}
          <div className="flex w-full justify-end gap-1 text-sm text-slate-700">
            <div
              role="button"
              tabIndex={0}
              className={twMerge('hover:underline', isShowCcInput && 'hidden')}
              onClick={handleClickCc}
            >
              {t('cc')}
            </div>
            <div
              role="button"
              tabIndex={0}
              className={twMerge('hover:underline', isShowBccInput && 'hidden')}
              onClick={handleClickBcc}
            >
              {t('bcc')}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComposePopupRecipient;
