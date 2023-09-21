import _ from 'lodash';
import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { ComposeViewTypeEnum } from '../../../../../../app/Enums/commonEnums';
import { triggerClickOutside } from '../../../../../utils/helpers';
import { EmailType, ImperativeHandleType } from '../../../SelectMultiEmail/SelectMultiEmail';
import ComposePopupRecipientInput from './ComposePopupRecipientInput';

interface ComposePopupRecipientProps {
  selectRecipient: Array<EmailType>;
  selectedCcRecipient: Array<EmailType>;
  selectedBccRecipient: Array<EmailType>;
  onChangeSelectRecipient: (selected: Array<EmailType>) => void;
  onChangeSelectCcRecipient: (selected: Array<EmailType>) => void;
  onChangeSelectBccRecipient: (selected: Array<EmailType>) => void;
  viewType?: string;
  className?: string;
}

const ComposePopupRecipient = ({
  viewType,
  className,
  selectRecipient,
  selectedCcRecipient,
  selectedBccRecipient,
  onChangeSelectRecipient,
  onChangeSelectCcRecipient,
  onChangeSelectBccRecipient,
}: ComposePopupRecipientProps) => {
  const [viewText, setViewText] = useState<boolean>(true);
  const recipientRef = useRef<HTMLDivElement>(null);
  const reRef = useRef() as MutableRefObject<ImperativeHandleType>;

  const { t } = useTranslation();

  const handleClickRecipient = () => {
    setViewText(false);
  };

  useEffect(() => {
    triggerClickOutside(recipientRef, () => {
      if (_.isFunction(reRef?.current?.handleClickOutside)) {
        const emailArray = reRef?.current?.handleClickOutside();
        if (!_.isEmpty(emailArray)) {
          onChangeSelectRecipient(emailArray);
        }
        setViewText(true);
      }
    });
  }, [recipientRef, triggerClickOutside]);

  const transferString = useMemo(() => {
    const array = selectRecipient?.concat(selectedBccRecipient, selectedCcRecipient);
    const string = array?.map((item: EmailType) => item.email);
    return string?.join(', ');
  }, [selectRecipient, selectedCcRecipient, selectedBccRecipient]);

  return (
    <div ref={recipientRef}>
      {viewText && (
        <div
          className={twMerge(
            'mx-1 my-1 flex items-center gap-2 border-b-[1px] border-gray-200 py-2 pb-3',
            viewType !== ComposeViewTypeEnum.REPLY && 'mx-2',
            viewType !== ComposeViewTypeEnum.FORWARD && 'mx-2',
            className,
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
        <ComposePopupRecipientInput
          viewText={viewText}
          selectRecipient={selectRecipient || []}
          onChangeSelectRecipient={onChangeSelectRecipient}
          selectedCcRecipient={selectedCcRecipient || []}
          onChangeSelectCcRecipient={onChangeSelectCcRecipient}
          selectedBccRecipient={selectedBccRecipient || []}
          onChangeSelectBccRecipient={onChangeSelectBccRecipient}
          className={className}
          viewType={viewType}
          ref={reRef}
        />
      )}
    </div>
  );
};

export default ComposePopupRecipient;
