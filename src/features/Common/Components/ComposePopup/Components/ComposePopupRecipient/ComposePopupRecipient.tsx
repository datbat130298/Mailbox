import _ from 'lodash';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { ComposeViewTypeEnum } from '../../../../../../app/Enums/commonEnums';
import { triggerClickOutside } from '../../../../../utils/helpers';
import SelectMultiEmail, { EmailType } from '../../../SelectMultiEmail/SelectMultiEmail';

interface ComposePopupRecipientProps {
  selectRecipient: Array<EmailType>;
  selectedCcRecipient: Array<EmailType>;
  selectedBccRecipient: Array<EmailType>;
  onChangeSelectRecipient: (selected: Array<EmailType>) => void;
  onChangeSelectCcRecipient: (selected: Array<EmailType>) => void;
  onChangeSelectBccRecipient: (selected: Array<EmailType>) => void;
  viewType?: string;
}

const ComposePopupRecipient = ({
  viewType,
  selectRecipient,
  selectedCcRecipient,
  selectedBccRecipient,
  onChangeSelectRecipient,
  onChangeSelectCcRecipient,
  onChangeSelectBccRecipient,
}: ComposePopupRecipientProps) => {
  const [viewText, setViewText] = useState<boolean>(true);
  const [isShowCcInput, setIsShowCcInput] = useState<boolean>(false);
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

  const transferString = useMemo(() => {
    const array = selectRecipient?.concat(selectedBccRecipient, selectedCcRecipient);
    const string = array?.map((item: EmailType) => item.email);
    return string?.join(', ');
  }, [selectRecipient, selectedCcRecipient, selectedBccRecipient]);

  useEffect(() => {
    if (_.isEmpty(selectedCcRecipient)) {
      setIsShowCcInput(false);
    }
    if (_.isEmpty(selectedBccRecipient)) {
      setIsShowBccInput(false);
    }
  }, [viewText]);

  return (
    <div ref={recipientRef}>
      {viewText && (
        <div
          className={twMerge(
            'mx-1 my-1 flex items-center gap-2 border-b-[1px] border-gray-200 py-2 pb-3',
            viewType !== ComposeViewTypeEnum.REPLY && 'mx-2',
            viewType !== ComposeViewTypeEnum.FORWARD && 'mx-2',
          )}
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
            'mx-1 flex flex-col items-center border-b-[1px] border-gray-200 py-0',
            _.isEmpty(selectRecipient) &&
              viewType !== ComposeViewTypeEnum.REPLY &&
              'mx-2 flex-row items-center',
            _.isEmpty(selectRecipient) &&
              viewType !== ComposeViewTypeEnum.REPLY &&
              'mx-2 flex-row items-center',
            (isShowBccInput || isShowCcInput) && 'mx-1 flex-col ',
          )}
        >
          <SelectMultiEmail
            label={t('to')}
            selectedValue={selectRecipient || []}
            onChange={onChangeSelectRecipient}
          />
          {isShowCcInput && (
            <SelectMultiEmail
              className="-mt-1"
              label={t('cc')}
              selectedValue={selectedCcRecipient || []}
              onChange={onChangeSelectCcRecipient}
            />
          )}
          {isShowBccInput && (
            <SelectMultiEmail
              className="-mt-1"
              label={t('bcc')}
              selectedValue={selectedBccRecipient || []}
              onChange={onChangeSelectBccRecipient}
            />
          )}
          <div className="ml-auto flex justify-end gap-1 text-sm text-slate-700">
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
