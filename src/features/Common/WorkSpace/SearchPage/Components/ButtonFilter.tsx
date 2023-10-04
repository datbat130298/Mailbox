/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';
import { nanoid } from 'nanoid';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { IoMdArrowDropright } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';
import { getMyContact } from '../../../../../app/Services/Contact/Contact';
import { triggerClickOutside } from '../../../../utils/helpers';
import SelectedItem from '../../../Components/SelectMultiEmail/SelectItem';
import { EmailType } from '../../../Components/SelectMultiEmail/SelectMultiEmail';

interface ButtonFilterProp {
  title: string;
  onSelect: (email: EmailType) => void;
  selected: Array<EmailType>;
  onRemove: (id: string) => void;
}

const ButtonFilter = ({ title, onSelect, selected, onRemove }: ButtonFilterProp) => {
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const [value, setValue] = useState('');
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const ref = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(
    async (searchValue: string) => {
      setIsLoading(true);
      const { data } = await getMyContact({
        per_page: 5,
        searchBy: ['email_address', 'user_name', 'full_name', 'last_name'],
        searchValue,
      });
      setUserData(data);
      setIsLoading(false);
    },
    [value],
  );

  const fetchDataDebounced = useCallback(_.debounce(fetchData, 500), []);

  const handleClickButton = () => {
    setIsShowDropDown((prev) => !prev);
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    triggerClickOutside(ref, () => {
      setIsShowDropDown(false);
    });
  }, [ref]);

  useEffect(() => {
    fetchDataDebounced('');
  }, []);

  useEffect(() => {
    if (!_.isEmpty(value)) {
      fetchDataDebounced(value);
    }
    setUserData([]);
  }, [value]);

  const valueTitle = useMemo(() => {
    if (_.isEmpty(selected)) {
      return title;
    }
    if (selected.length === 1) {
      return `${title}: ${selected[0].email}`;
    }

    return `${title}: ${selected[0].email} +${selected.length - 1}`;
  }, [selected]);

  const options = useMemo(() => {
    const arrayId = selected?.map((email) => email.id?.toString());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return userData?.filter((item: any) => {
      if (arrayId?.includes(item?.id?.toString())) return null;
      return item;
    });
  }, [userData, selected]);

  return (
    <div
      className={twMerge(
        'relative flex w-max items-center justify-between gap-2 rounded-md bg-[#F5F6F8] px-2 py-1.5 text-gray-700 shadow-none transition-all duration-300',
        !_.isEmpty(selected) && ' bg-blue-950  text-white',
      )}
      role="button"
      tabIndex={0}
      onClick={handleClickButton}
      ref={ref}
    >
      {!_.isEmpty(selected) && <BsCheckLg />}
      <p className="line-clamp-1 w-fit flex-1 text-sm font-semibold">{valueTitle}</p>
      <IoMdArrowDropright size={20} className={twMerge(' ', isShowDropDown && 'rotate-90 transition-all')} />
      {isShowDropDown && (
        <div className="absolute -left-0.5 top-full z-50 min-w-[300px] gap-1 bg-white py-3 shadow-box">
          {!_.isEmpty(selected) && (
            <div className="flex flex-wrap gap-1 px-3 py-1">
              {selected.map((item: any) => (
                <SelectedItem key={nanoid()} id={item.id} email={item.email} onRemove={onRemove} />
              ))}
            </div>
          )}
          <input
            placeholder="Name or email"
            onChange={handleChangeInput}
            value={value}
            className="w-full border-b border-gray-300 px-4 pb-2 text-sm outline-none"
          />
          <div className="mt-3">
            {!_.isEmpty(options) &&
              !isLoading &&
              options.map((item: any) => (
                <div
                  key={nanoid()}
                  className="mt-1 flex items-center gap-3 px-4 py-1 hover:bg-slate-100"
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    onSelect({ id: item.id, email: item.email_address });
                    setIsShowDropDown(false);
                  }}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 text-xl uppercase">
                    {item.email_address.slice(0, 1)}
                  </div>
                  <div className="item-center flex flex-col justify-center">
                    <p className="text-sm">{item.email_address}</p>
                    <p className="text-sm text-gray-500">{item.email_address}</p>
                  </div>
                </div>
              ))}
            {isLoading && (
              <div>
                <div className="flex gap-3 border-b border-gray-50 p-1.5 px-3">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-slate-100" />
                  <div className="flex h-full w-full flex-col items-start justify-between gap-2 bg-white ">
                    <div className="h-4 w-1/2 rounded-lg bg-slate-100" />
                    <div className="h-4 w-3/4 rounded-lg bg-slate-100" />
                  </div>
                </div>
                <div className="flex gap-3 border-b border-gray-50 p-1.5 px-3">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-slate-100" />
                  <div className="flex h-full w-full flex-col items-start justify-between gap-2 bg-white ">
                    <div className="h-4 w-1/2 rounded-lg bg-slate-100" />
                    <div className="h-4 w-3/4 rounded-lg bg-slate-100" />
                  </div>
                </div>
                <div className="flex gap-3 border-b border-gray-50 p-1.5 px-3">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-slate-100" />
                  <div className="flex h-full w-full flex-col items-start justify-between gap-2 bg-white ">
                    <div className="h-4 w-1/2 rounded-lg bg-slate-100" />
                    <div className="h-4 w-3/4 rounded-lg bg-slate-100" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonFilter;
