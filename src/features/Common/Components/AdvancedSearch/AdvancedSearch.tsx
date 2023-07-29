import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoOptionsSharp } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import useSelector from '../../../Hooks/useSelector';
import { triggerClickOutside } from '../../../utils/helpers';
import Button from '../Button';
import Checkbox from '../Form/Checkbox';
import Input from '../Form/Input';
import ItemSearchAdvanced from './ItemSearchAdvanced';
import SelectTimeRange from './SelectTimeRange';
import SelectTypeKeyWork from './SelectTypeKeyWork';

const AdvancedSearch = () => {
  const { t } = useTranslation();
  const dropdownSearchTabRef = useRef<HTMLDivElement>(null);
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [fromKeyWord, setFromKeyWord] = useState('');
  const [toKeyWord, setToKeyWord] = useState('');
  const [subjectKeyWord, setSubjectKeyWord] = useState('');
  const [haveKeyWord, setHaveKeyWork] = useState('');
  const [notHaveKeyWork, setNotHaveKeyWork] = useState('');
  const [timeRange, setTimeRange] = useState('1_day');
  const [typeKeyWork, setTypeKeyWork] = useState('all');
  const [dateKeyWork, setDateKeyWork] = useState(new Date().toString());
  const [hasAttachmentChecked, setHasAttachmentChecked] = useState(false);
  const [searchTearm, setSearchTearm] = useState('');

  const handleClear = () => {
    setFromKeyWord('');
    setToKeyWord('');
    setSubjectKeyWord('');
    setHaveKeyWork('');
    setNotHaveKeyWork('');
    setTimeRange('1_day');
    setTypeKeyWork('all');
    setDateKeyWork(new Date().toString());
  };

  const searchTerm = useSelector((state) => state.labelSidebar.searchTerm);

  useEffect(() => {
    if (searchTerm !== null) {
      setSearchTearm(`${searchTerm.key}:${searchTerm.value}`);
    }
  }, [searchTerm]);

  useEffect(() => {
    triggerClickOutside(dropdownSearchTabRef, () => {
      setIsShowDropdown(false);
      handleClear();
    });
  }, [dropdownSearchTabRef]);

  return (
    <div ref={dropdownSearchTabRef} className="relative w-fit py-3.5">
      <div className="flex h-12 w-[720px] justify-start rounded-4xl bg-slate-200 p-1.5">
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-gray-700 hover:bg-gray-300">
          <HiOutlineSearch size={18} />
        </div>
        <Input
          size="sm"
          value={searchTearm}
          onChange={(e) => setSearchTearm(e.target.value)}
          placeholder={t('search_in_mailbox') as string}
          className="mx-1 h-full w-[628px] border-none bg-transparent px-[-4px]"
          inputClassName="placeholder-gray-500"
          isShowPlacehoder
        />
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsShowDropdown((prev) => !prev)}
          className={twMerge(
            'flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-gray-700 hover:bg-gray-300',
            isShowDropdown && 'bg-gray-300',
          )}
        >
          <IoOptionsSharp size={20} />
        </div>
      </div>
      {isShowDropdown && (
        <div className=" absolute left-0 top-16 z-10 h-fit w-full rounded-sm border-[0.5px] bg-white px-5 py-3 shadow-box">
          <ItemSearchAdvanced label={t('from')} value={fromKeyWord} onChange={setFromKeyWord} />
          <ItemSearchAdvanced label={t('to')} value={toKeyWord} onChange={setToKeyWord} />
          <ItemSearchAdvanced label={t('subject')} value={subjectKeyWord} onChange={setSubjectKeyWord} />
          <ItemSearchAdvanced label={t('have_the_words')} value={haveKeyWord} onChange={setHaveKeyWork} />
          <ItemSearchAdvanced
            label={t('does_not_have')}
            value={notHaveKeyWork}
            onChange={setNotHaveKeyWork}
          />
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
            <Button
              color="light"
              size="xs"
              className="w-28 bg-gray-100  py-2 text-xs text-gray-700 shadow-none  ring-1"
            >
              {t('create_filter')}
            </Button>
            <Button size="xs" className="w-28 py-2 text-xs shadow-none ring-1">
              {t('apply')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
