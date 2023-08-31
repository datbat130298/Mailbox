/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { nanoid } from 'nanoid';
import React, { forwardRef, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { getMyContact } from '../../../../app/Services/Contact/Contact';
import { UserDataType } from '../../../../app/Types/userTypes';
import OptionEmail from './OptionEmail';
import OptionSkeleton from './OptionSkeleton';
import SelectedItem from './SelectItem';

export interface EmailType {
  id?: string;
  email: string;
  avatar?: string;
}

interface SelectMultiEmailProp {
  className?: string;
  label: string;
  onChange: (email: Array<EmailType>) => void;
  selectedValue: Array<EmailType>;
}

const SelectMultiEmail = ({ className, label, onChange, selectedValue }: SelectMultiEmailProp) => {
  const [arrayEmail, setArrayEmail] = useState<Array<EmailType>>([]);
  const [value, setValue] = useState('');
  const [contact, setContact] = useState<Array<UserDataType>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(
    async (searchValue: string) => {
      setIsLoading(true);
      const { data } = await getMyContact({
        per_page: 5,
        searchBy: ['email', 'user_name', 'full_name', 'last_name'],
        searchValue,
      });
      setContact(data);
      setIsLoading(false);
    },
    [value],
  );

  const fetchDataDebounced = useCallback(_.debounce(fetchData, 500), []);

  const options = useMemo(() => {
    const arrayId = arrayEmail.map((email) => email.id);
    return contact.filter((item: UserDataType) => {
      if (arrayId.includes(item.uuid.toString())) return;
      // eslint-disable-next-line consistent-return
      return item;
    });
  }, [contact, arrayEmail]);

  useEffect(() => {
    if (!_.isEmpty(value)) {
      fetchDataDebounced(value);
    }
    setContact([]);
  }, [value]);

  const inputRef = useRef<HTMLInputElement>(null);

  const validateEmail = (mail: string) => {
    return String(mail).match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
    );
  };

  const handleClickRemove = (id: string) => {
    let array = [];
    array = arrayEmail.filter((item) => item.id !== id);
    setArrayEmail(array);
  };

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent) => {
      const { key } = e;
      if (_.isEmpty(value)) {
        if (key === 'Backspace') {
          if (arrayEmail.length >= 1) {
            const { id } = arrayEmail[arrayEmail.length - 1];
            handleClickRemove(id || '');
          }
        }
      }
      if (key === 'Enter' && !!validateEmail(value)) {
        setArrayEmail((prev) => [...prev, { id: nanoid(), email: value }]);
        onChange(arrayEmail);
        setValue('');
        return;
      }
      if (key === 'Enter' && !validateEmail(value) && !_.isEmpty(options)) {
        e.preventDefault();
        setArrayEmail((prev) => [...prev, { id: options[0].uuid.toString(), email: options[0].email }]);
        setValue('');
        onChange(arrayEmail);
      }
    },
    [value, options],
  );

  const handleClickInput = () => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  };

  const handleClickOption = (user: UserDataType) => {
    setArrayEmail((prev) => [...prev, { id: user.uuid.toString(), email: user.email }]);
    setValue('');
  };

  useEffect(() => {
    onChange(arrayEmail);
  }, [arrayEmail]);

  useLayoutEffect(() => {
    setArrayEmail(selectedValue);
  }, []);

  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div
      className={twMerge(
        'border-gray-1 relative mt-[5px] flex max-h-max w-full items-center justify-start gap-2 py-1 pb-1.5 text-sm',
        className,
      )}
    >
      <div className="mb-0.5 h-full items-start text-slate-600 hover:underline" role="button" tabIndex={0}>
        {label}
      </div>
      <div
        className="flex max-h-max flex-1 flex-wrap items-center gap-2"
        tabIndex={0}
        role="button"
        onClick={handleClickInput}
      >
        {!_.isEmpty(arrayEmail) && (
          <div className=" flex max-h-max flex-wrap gap-2">
            {arrayEmail.map((item: EmailType) => (
              <SelectedItem
                key={item.id}
                email={item.email}
                id={item?.id || '0'}
                onRemove={handleClickRemove}
              />
            ))}
          </div>
        )}
        <input
          ref={inputRef}
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
          className="h-full flex-1 py-1 outline-none"
          onKeyUp={handleKeyUp}
        />
      </div>
      {!isLoading && !_.isEmpty(options) && !_.isEmpty(value) && (
        <OptionEmail
          data={options}
          onClickOption={handleClickOption}
          value={value}
          defaultValue={options[0]}
        />
      )}
      {isLoading && !_.isEmpty(value) && <OptionSkeleton />}
    </div>
  );
};

export default forwardRef(SelectMultiEmail);
