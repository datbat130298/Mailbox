/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { nanoid } from 'nanoid';
import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
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

export type ImperativeHandleType = {
  handleClickOutside: () => void;
};

interface SelectMultiEmailProp {
  className?: string;
  label: string;
  onChange: (email: Array<EmailType>) => void;
  selectedValue: Array<EmailType>;
}

const SelectMultiEmail = (
  { className, label, onChange, selectedValue }: SelectMultiEmailProp,
  ref: ForwardedRef<ImperativeHandleType>,
) => {
  const [arrayEmail, setArrayEmail] = useState<Array<EmailType>>([]);
  const [value, setValue] = useState('');
  const [contact, setContact] = useState<Array<UserDataType>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentValue, setCurrentValue] = useState<UserDataType>();

  const fetchData = useCallback(
    async (searchValue: string) => {
      setIsLoading(true);
      const { data } = await getMyContact({
        per_page: 5,
        searchBy: ['email_address', 'user_name', 'full_name', 'last_name'],
        searchValue,
      });
      setContact(data);
      setIsLoading(false);
    },
    [value],
  );

  const fetchDataDebounced = useCallback(_.debounce(fetchData, 500), []);

  const options = useMemo(() => {
    const arrayId = arrayEmail?.map((email) => email.id);
    return contact?.filter((item: UserDataType) => {
      if (arrayId?.includes(item?.id?.toString())) return null;
      return item;
    });
  }, [contact, arrayEmail]);

  useEffect(() => {
    if (!_.isEmpty(options)) {
      setCurrentValue(options[0]);
    }
  }, [options, arrayEmail]);

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
      // if (key === 'Enter' && !!validateEmail(value)) {
      //   setArrayEmail((prev) => [...prev, { id: nanoid(), email: value }]);
      //   onChange(arrayEmail);
      //   setValue('');
      //   return;
      // }
      if (key === 'Enter' && !_.isEmpty(currentValue)) {
        if (arrayEmail[arrayEmail.length - 1]?.id?.toString() !== currentValue?.id?.toString()) {
          e.preventDefault();
          setArrayEmail((prev) => [
            ...prev,
            { id: currentValue?.id?.toString(), email: currentValue?.email_address } as EmailType,
          ]);
          setValue('');
          onChange(arrayEmail);
        }
      }
    },
    [value, options, currentValue, arrayEmail],
  );

  const handleClickInput = () => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  };

  const handleClickOption = (user: UserDataType) => {
    setArrayEmail((prev) => [...prev, { id: user?.id?.toString(), email: user?.email_address } as EmailType]);
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

  const handleClickOutside = useCallback(() => {
    if (validateEmail(value)) {
      return [...arrayEmail, { id: nanoid(), email: value }];
    }
    return null;
  }, [value]);

  useImperativeHandle(
    ref,
    () => {
      return { handleClickOutside };
    },
    [ref, value],
  );

  return (
    <div
      className={twMerge(
        'relative mt-[5px] flex max-h-max w-full items-center justify-start gap-2 py-1 pb-1.5 text-sm',
        className,
      )}
    >
      <div className="absolute left-0 top-1.5 text-slate-600 hover:underline" role="button" tabIndex={0}>
        {label}
      </div>
      <div
        className="ml-5 flex max-h-max flex-1 flex-wrap items-center gap-2"
        tabIndex={0}
        role="button"
        onClick={handleClickInput}
      >
        <div className=" flex h-fit flex-wrap gap-2">
          {!_.isEmpty(arrayEmail) && (
            <>
              {arrayEmail.map((item: EmailType) => (
                <SelectedItem
                  key={item.id}
                  email={item.email}
                  id={item?.id || '0'}
                  onRemove={handleClickRemove}
                />
              ))}
            </>
          )}
          <input
            ref={inputRef}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            className="h-6 min-w-[20px] flex-1 py-1 outline-none"
            onKeyUp={handleKeyUp}
          />
        </div>
      </div>
      {!isLoading && !_.isEmpty(options) && !_.isEmpty(value) && (
        <OptionEmail
          data={options}
          currentValue={currentValue}
          setCurrentValue={setCurrentValue}
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
