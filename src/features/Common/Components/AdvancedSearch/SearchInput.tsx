import _ from 'lodash';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getMyContact } from '../../../../app/Services/Contact/Contact';
import { UserDataType } from '../../../../app/Types/userTypes';
import { triggerClickOutside } from '../../../utils/helpers';
import OptionEmail from '../SelectMultiEmail/OptionEmail';
import OptionSkeleton from '../SelectMultiEmail/OptionSkeleton';
import { EmailType } from '../SelectMultiEmail/SelectMultiEmail';

interface SearchInputProp {
  label: string;
  onChange: Dispatch<SetStateAction<string[]>>;
  value: string[];
}

const SearchInput = ({ value, label, onChange }: SearchInputProp) => {
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const [userData, setUserData] = useState<UserDataType[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentValue, setCurrentValue] = useState<UserDataType>();
  const [arrayEmail, setArrayEmail] = useState<EmailType>();
  const [isLoading, setIsLoading] = useState(true);

  const ref = useRef<HTMLDivElement>(null);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsShowDropDown(true);
  };

  const fetchData = useCallback(async (searchValue: string) => {
    setIsLoading(true);
    const { data } = await getMyContact({
      per_page: 5,
      searchBy: ['email_address', 'user_name', 'full_name', 'last_name'],
      searchValue,
    });
    setUserData(data);
    setIsLoading(false);
  }, []);
  const fetchDataDebounced = useCallback(_.debounce(fetchData, 500), []);

  const textHighlight = useMemo(() => {
    return searchTerm.split(',').at(-1);
  }, [searchTerm]);

  const replaceText = (textOrigin: string, textReplace: string) => {
    const newTextReplace = textOrigin.split(',').at(-1);
    if (newTextReplace) {
      return `${_.replace(textOrigin, newTextReplace, textReplace)}, `;
    }
    return `${textReplace}, `;
  };

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent) => {
      const { key } = e;
      // if (key === 'Backspace') {
      //   if (arrayEmail.length >= 1) {
      //     const { id } = arrayEmail[arrayEmail.length - 1];
      //     handleClickRemove(id || '');
      //   }
      // }
      if (key === 'Enter') {
        e.preventDefault();
        setArrayEmail({ id: currentValue?.id?.toString(), email: currentValue?.email_address } as EmailType);
        setIsShowDropDown(false);
        setSearchTerm((prev) => replaceText(prev, currentValue?.email_address || ''));
      }
    },
    [currentValue],
  );

  const handleClickOption = useCallback(
    (user: UserDataType) => {
      setArrayEmail({ id: user?.id?.toString(), email: user?.email_address } as EmailType);
      setIsShowDropDown(false);
      setSearchTerm((prev) => replaceText(prev, user.email_address || ''));
    },
    [searchTerm],
  );

  useEffect(() => {
    fetchDataDebounced('');
  }, []);

  useEffect(() => {
    const newParam = searchTerm.split(',').at(-1);
    fetchDataDebounced(newParam || '');
  }, [searchTerm]);

  useEffect(() => {
    const emailSelect = arrayEmail?.email;

    if (emailSelect && value.includes(emailSelect)) {
      return;
    }
    if (emailSelect && !value.includes(emailSelect)) {
      onChange((prev) => [...prev, emailSelect]);
    }
  }, [arrayEmail, value]);

  useEffect(() => {
    triggerClickOutside(ref, () => {
      setIsShowDropDown(false);
    });
  }, [ref]);

  return (
    <div className="mb-0.5 grid h-fit w-full grid-cols-5" ref={ref}>
      <div className="col-span-1 h-10 text-left text-sm font-normal leading-[48px] text-gray-600">
        {label}
      </div>
      <div className="relative col-span-4 flex h-10 items-center">
        <input
          onChange={handleChangeInput}
          value={searchTerm}
          onKeyUp={handleKeyUp}
          className="w-full border-b text-sm outline-none"
        />
        {isShowDropDown && !isLoading && (
          <div className="mt-3">
            {!_.isEmpty(userData) && (
              <OptionEmail
                data={userData}
                currentValue={currentValue}
                setCurrentValue={setCurrentValue}
                onClickOption={handleClickOption}
                value={textHighlight?.trim() || ''}
                defaultValue={userData[0]}
              />
            )}
          </div>
        )}
        {isLoading && isShowDropDown && <OptionSkeleton />}
      </div>
    </div>
  );
};

export default SearchInput;
