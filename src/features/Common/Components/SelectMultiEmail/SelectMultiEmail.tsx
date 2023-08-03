import _ from 'lodash';
import { nanoid } from 'nanoid';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';
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

  const inputRef = useRef<HTMLInputElement>(null);

  const validateEmail = (mail: string) => {
    return String(mail)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (_.isEmpty(value)) return;
    if (e.key === 'Enter' && validateEmail(value)) {
      setArrayEmail((prev) => [...prev, { id: nanoid(), email: value }]);
      onChange(arrayEmail);
      setValue('');
    }
  };

  const handleClickRemove = (id: string) => {
    let array = [];
    array = arrayEmail.filter((item) => item.id !== id);
    setArrayEmail(array);
  };

  const handleClickInput = () => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
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
        'border-gray-1 mt-[5px] flex max-h-max w-full items-center justify-start gap-2 py-1 pb-1.5 text-sm',
        className,
      )}
    >
      <div className="mb-0.5 h-full items-start text-slate-600 hover:underline" role="button" tabIndex={0}>
        {label}
      </div>
      <div
        className="flex max-h-max flex-wrap items-center gap-2"
        tabIndex={0}
        role="button"
        onClick={handleClickInput}
      >
        {!_.isEmpty(arrayEmail) && (
          <div className="mb-1 flex max-h-max flex-wrap gap-2">
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
          className="h-full py-1 outline-none"
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default SelectMultiEmail;
