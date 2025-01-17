import _ from 'lodash';
import React, { ForwardedRef, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { ComposeViewTypeEnum } from '../../../../../../app/Enums/commonEnums';
import SelectMultiEmail, {
  EmailType,
  ImperativeHandleType,
} from '../../../SelectMultiEmail/SelectMultiEmail';

interface ComposePopupRecipientInputProp {
  selectRecipient: Array<EmailType>;
  selectedCcRecipient: Array<EmailType>;
  selectedBccRecipient: Array<EmailType>;
  onChangeSelectRecipient: (selected: Array<EmailType>) => void;
  onChangeSelectCcRecipient: (selected: Array<EmailType>) => void;
  onChangeSelectBccRecipient: (selected: Array<EmailType>) => void;
  viewType?: string;
  className?: string;
  viewText: boolean;
}

const ComposePopupRecipientInput = (
  {
    viewType,
    className,
    selectRecipient,
    selectedCcRecipient,
    selectedBccRecipient,
    onChangeSelectRecipient,
    onChangeSelectBccRecipient,
    onChangeSelectCcRecipient,
    viewText,
  }: ComposePopupRecipientInputProp,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ref: ForwardedRef<ImperativeHandleType>,
) => {
  const { t } = useTranslation();
  const recipientRef = useRef(null);

  const [isShowCcInput, setIsShowCcInput] = useState<boolean>(false);
  const [isShowBccInput, setIsShowBccInput] = useState<boolean>(false);

  const handleClickCc = () => {
    setIsShowCcInput(true);
  };

  const handleClickBcc = () => {
    setIsShowBccInput(true);
  };

  useEffect(() => {
    if (_.isEmpty(selectedCcRecipient)) {
      setIsShowCcInput(false);
    }
    if (_.isEmpty(selectedBccRecipient)) {
      setIsShowBccInput(false);
    }
  }, [viewText]);

  return (
    <div
      className={twMerge(
        'mx-2 my-0.5 flex flex-col items-center border-b-[1px] border-gray-200 py-px pb-0.5',
        _.isEmpty(selectRecipient) && viewType !== ComposeViewTypeEnum.REPLY && 'mx-2 flex-row items-center',
        _.isEmpty(selectRecipient) && viewType !== ComposeViewTypeEnum.REPLY && 'mx-2 flex-row items-center',
        (isShowBccInput ||
          isShowCcInput ||
          !_.isEmpty(selectedCcRecipient) ||
          !_.isEmpty(selectedBccRecipient)) &&
          'mx-1 flex-col',
        className,
      )}
      ref={recipientRef}
    >
      <SelectMultiEmail
        ref={ref}
        label={t('to')}
        selectedValue={selectRecipient || []}
        onChange={onChangeSelectRecipient}
      />
      {(isShowCcInput || !_.isEmpty(selectedCcRecipient)) && (
        <SelectMultiEmail
          ref={ref}
          className="-mt-1"
          label={t('cc')}
          selectedValue={selectedCcRecipient || []}
          onChange={onChangeSelectCcRecipient}
        />
      )}
      {(isShowBccInput || !_.isEmpty(selectedBccRecipient)) && (
        <SelectMultiEmail
          ref={ref}
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
          className={twMerge(
            'hover:underline',
            (isShowCcInput || !_.isEmpty(selectedCcRecipient)) && 'hidden',
          )}
          onClick={handleClickCc}
        >
          {t('cc')}
        </div>
        <div
          role="button"
          tabIndex={0}
          className={twMerge(
            'hover:underline',
            (isShowBccInput || !_.isEmpty(selectedBccRecipient)) && 'hidden',
          )}
          onClick={handleClickBcc}
        >
          {t('bcc')}
        </div>
      </div>
    </div>
  );
};

export default React.forwardRef(ComposePopupRecipientInput);
