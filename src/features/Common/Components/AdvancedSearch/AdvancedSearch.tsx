import _ from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoOptionsSharp } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { triggerClickOutside } from '../../../utils/helpers';
import ButtonRipple from '../Button/ButtonRipple/ButtonRiple';
import Checkbox from '../Form/Checkbox';
import Input from '../Form/Input';
import ItemSearchAdvanced from './ItemSearchAdvanced';
import SearchInput from './SearchInput';
import SelectTimeRange from './SelectTimeRange';
import SelectTypeKeyWork from './SelectTypeKeyWork';

const AdvancedSearch = () => {
  const { t } = useTranslation();

  const dropdownSearchTabRef = useRef<HTMLDivElement>(null);
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [fromKeyWord, setFromKeyWord] = useState<string[]>([]);
  const [toKeyWord, setToKeyWord] = useState<string[]>([]);
  const [subjectKeyWord, setSubjectKeyWord] = useState('');
  const [haveKeyWord, setHaveKeyWork] = useState('');
  const [timeRange, setTimeRange] = useState('1_day');
  const [typeKeyWork, setTypeKeyWork] = useState('all');
  const [dateKeyWork, setDateKeyWork] = useState('');
  const [hasAttachmentChecked, setHasAttachmentChecked] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleClear = () => {
    setFromKeyWord([]);
    setToKeyWord([]);
    setSubjectKeyWord('');
    setHaveKeyWork('');
    setTimeRange('1_day');
    setTypeKeyWork('all');
    setDateKeyWork('');
  };

  const handleCloseDropdown = () => {
    setIsShowDropdown(false);
  };

  const handleApply = useCallback(() => {
    navigate({
      pathname: '/search',
      search: createSearchParams({
        from: [...fromKeyWord],
        to: [...toKeyWord],
        search: haveKeyWord || searchTerm,
        subject: subjectKeyWord || haveKeyWord || searchTerm,
        body: haveKeyWord || searchTerm,
        attachment: hasAttachmentChecked.toString(),
        type: typeKeyWork,
      }).toString(),
    });
    setIsShowDropdown(false);
  }, [fromKeyWord, toKeyWord, haveKeyWord, subjectKeyWord, hasAttachmentChecked, typeKeyWork, searchTerm]);

  useEffect(() => {
    triggerClickOutside(dropdownSearchTabRef, () => {
      setIsShowDropdown(false);
      handleClear();
      setIsFocus(false);
    });
  }, [dropdownSearchTabRef]);

  useEffect(() => {
    if (isShowDropdown) {
      setHaveKeyWork(searchTerm);
    }
  }, [isShowDropdown]);

  const handleEnter = (e: KeyboardEvent) => {
    const { key } = e;
    if (key !== 'Enter') return;
    handleApply();
  };

  useEffect(() => {
    if (pathname !== '/search') setSearchTerm('');
  }, [pathname]);

  return (
    <div ref={dropdownSearchTabRef} className="relative w-0 py-0 md:ml-2 md:w-fit lg:py-3.5">
      <div
        className={twMerge(
          'flex h-12 w-0 items-center justify-start rounded-4xl bg-slate-200 p-0 md:w-[450px] md:pl-1.5 lg:p-1.5 xl:w-[720px]',
          isFocus && 'bg-slate-50 shadow-md',
          isShowDropdown && 'rounded-b-none bg-white',
        )}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={handleApply}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-gray-700 hover:bg-gray-300"
        >
          <HiOutlineSearch size={18} className="hidden md:block" />
        </div>
        <Input
          onFocus={() => setIsFocus(true)}
          size="sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t('search_in_mailbox') as string}
          className="mx-1 h-full w-0 flex-1 border-none bg-transparent px-[-4px] md:mb-3 md:w-[330px] lg:w-full"
          inputClassName="placeholder-gray-500"
          isShowPlaceholder
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onKeyUp={(e: any) => handleEnter(e)}
        />
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            handleClear();
            handleCloseDropdown();
            setSearchTerm('');
          }}
          className={twMerge(
            'z-10 hidden h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-gray-600 transition-all duration-150 hover:bg-slate-100 hover:shadow-md md:ml-auto md:mr-2',
            !_.isEmpty(searchTerm) && 'flex',
          )}
        >
          <MdClose size={23} />
        </div>
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsShowDropdown((prev) => !prev)}
          className={twMerge(
            'hidden h-0 w-0 flex-shrink-0 items-center justify-center rounded-full text-gray-700 transition-all duration-100 hover:bg-slate-100 hover:shadow-md md:ml-auto md:mr-2 md:flex md:h-9 md:w-9',
          )}
        >
          <IoOptionsSharp size={20} />
        </div>
      </div>
      {isShowDropdown && (
        <div className=" absolute left-0 top-[37px] z-10 h-fit w-full rounded-sm rounded-b-4xl border-t-0 bg-white px-5 pb-3 shadow-md xl:top-14">
          <SearchInput label={t('from')} value={fromKeyWord} onChange={setFromKeyWord} />
          <SearchInput label={t('to')} value={toKeyWord} onChange={setToKeyWord} />
          <ItemSearchAdvanced label={t('subject')} value={subjectKeyWord} onChange={setSubjectKeyWord} />
          <ItemSearchAdvanced label={t('have_the_words')} value={haveKeyWord} onChange={setHaveKeyWork} />
          <SelectTimeRange
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            dateKeyWork={dateKeyWork}
            setDateKeyWork={setDateKeyWork}
          />
          <SelectTypeKeyWork typeKeyWork={typeKeyWork} setTypeKeyWork={setTypeKeyWork} />
          <div className="mb-0.5 flex h-fit w-full">
            <div className="flex-center h-10 w-max">
              <Checkbox
                checked={hasAttachmentChecked}
                onChange={(e) => setHasAttachmentChecked(e.target.checked)}
              />
            </div>
            <div className="h-10 w-max px-4 text-sm font-[400] leading-10 text-gray-700">
              {t('has_attachment')}
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-x-2 py-3">
            <ButtonRipple className="w-28 py-2 text-xs shadow-none" onClick={handleApply}>
              {t('apply')}
            </ButtonRipple>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
