import _ from 'lodash';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { BaseQueryParamsType } from '../../../../../app/Types/commonTypes';
import { queryParamsDefault } from '../../../../utils/helpers';
import { EmailType } from '../../../Components/SelectMultiEmail/SelectMultiEmail';
import ButtonFilter from './ButtonFilter';
import ButtonFilterTime, { ImperativeHandleResetTimeType } from './ButtonFilterTime';

interface SearchHeaderProp {
  setQueryParam: Dispatch<SetStateAction<BaseQueryParamsType>>;
}

const SearchHeader = ({ setQueryParam }: SearchHeaderProp) => {
  const { t } = useTranslation();
  const refTime = useRef<ImperativeHandleResetTimeType>(null);

  const [fromEmail, setFromEmail] = useState<Array<EmailType>>([]);
  const [toEmail, setToEmail] = useState<Array<EmailType>>([]);
  const [hasAttachment, setHasAttachment] = useState(false);

  const handleClickHasAttachment = () => {
    setHasAttachment((prev) => !prev);
  };

  const handleSelectFrom = (email: EmailType) => {
    setFromEmail((prev) => [...prev, { id: email.id, email: email.email }]);
  };

  const handleSelectTo = (email: EmailType) => {
    setToEmail((prev) => [...prev, { id: email.id, email: email.email }]);
  };

  useEffect(() => {
    const toEmailArray: string[] = toEmail.map((item: EmailType) => item.email);
    const fromEmailArray: string[] = fromEmail.map((item: EmailType) => (item.id ? item.id.toString() : ''));
    setQueryParam((prev: BaseQueryParamsType) => ({
      ...prev,
      filterParams: [
        { filterBy: 'email_address', values: [...toEmailArray] },
        { filterBy: 'email_account_id', values: [...fromEmailArray] },
      ],
    }));
  }, [toEmail, fromEmail]);

  const handleChangeSearchTerm = (value: BaseQueryParamsType) => {
    setQueryParam((prev: BaseQueryParamsType) => ({
      ...prev,
      end: value.end,
      start: value.start,
    }));
  };

  const handleClickResetFilter = () => {
    setToEmail([]);
    setFromEmail([]);
    setQueryParam(queryParamsDefault);
    if (refTime?.current !== null) {
      refTime?.current?.handleReset();
    }
  };

  const handleRemoveFromEmail = (id: string) => {
    let newArr: EmailType[] = [];
    newArr = fromEmail.filter((item: EmailType) => item.id !== id);
    setFromEmail(newArr);
  };

  const handleRemoveToEmail = (id: string) => {
    let newArr: EmailType[] = [];
    newArr = toEmail.filter((item: EmailType) => item.id !== id);
    setToEmail(newArr);
  };

  return (
    <div className="no-scrollbar flex h-full w-full items-start justify-between gap-4 overflow-auto px-4 pb-1 pt-3 lg:pb-0">
      <div className="flex flex-1 items-center gap-3">
        <ButtonFilter
          title={t('from')}
          onSelect={handleSelectFrom}
          selected={fromEmail}
          onRemove={handleRemoveFromEmail}
        />
        <ButtonFilter
          title={t('to')}
          selected={toEmail}
          onSelect={handleSelectTo}
          onRemove={handleRemoveToEmail}
        />
        <ButtonFilterTime onChangeSearchTerm={handleChangeSearchTerm} ref={refTime} />
        <div
          className={twMerge(
            'flex w-max items-center justify-between gap-2 rounded-md border border-gray-500 px-2 py-1 font-semibold text-gray-700 shadow-none  transition-all',
            hasAttachment && 'border-blue-100 bg-blue-100 shadow-md',
          )}
          role="button"
          tabIndex={0}
          onClick={handleClickHasAttachment}
        >
          <p className="line-clamp-1 text-sm ">{t('has_attachment')}</p>
        </div>
        {(!_.isEmpty(fromEmail) || !_.isEmpty(toEmail)) && (
          <div
            className={twMerge(
              'flex w-max items-center justify-between gap-2 rounded-md border border-gray-500 px-2 py-1 font-semibold text-gray-700 hover:shadow-md active:border-blue-100 active:bg-blue-100 active:shadow-none',
            )}
            role="button"
            tabIndex={0}
            onClick={handleClickResetFilter}
          >
            <p className="line-clamp-1 text-sm ">{t('reset_filter')}</p>
          </div>
        )}
      </div>
      <p className="line-clamp-1 hidden items-center text-center font-semibold text-blue-600 md:flex">
        {t('advanced_search')}
      </p>
    </div>
  );
};

export default SearchHeader;
