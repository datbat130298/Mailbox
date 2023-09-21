import dayjs from 'dayjs';
import _ from 'lodash';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoOptionsSharp } from 'react-icons/io5';
import { MdClose } from 'react-icons/md';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { getListEmail } from '../../../../app/Services/ConversationService/ConversationService';
import { getDrafts } from '../../../../app/Services/Drafts/DraftsService';
import { search } from '../../../../app/Services/Search/SearchService';
import { getSent } from '../../../../app/Services/Sent/SentService';
import { getStarred } from '../../../../app/Services/Starred/StarredService';
import { getTrash } from '../../../../app/Services/Trash/TrashService';
import { setMail } from '../../../../app/Slices/mailSlice';
import { BaseQueryParamsType } from '../../../../app/Types/commonTypes';
import useDispatch from '../../../Hooks/useDispatch';
import useNotify from '../../../Hooks/useNotify';
import useSelector from '../../../Hooks/useSelector';
import { queryParamsDefault, triggerClickOutside } from '../../../utils/helpers';
import Button from '../Button';
import Checkbox from '../Form/Checkbox';
import Input from '../Form/Input';
import ItemSearchAdvanced from './ItemSearchAdvanced';
import SearchInput from './SearchInput';
import SelectTimeRange from './SelectTimeRange';
import SelectTypeKeyWork from './SelectTypeKeyWork';

interface AdvancedSearchProp {
  setIsShowLoading: Dispatch<SetStateAction<boolean>>;
}

const AdvancedSearch = ({ setIsShowLoading }: AdvancedSearchProp) => {
  const { t } = useTranslation();
  const toast = useNotify();

  const dropdownSearchTabRef = useRef<HTMLDivElement>(null);
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [fromKeyWord, setFromKeyWord] = useState<string[]>([]);
  const [toKeyWord, setToKeyWord] = useState<string[]>([]);
  const [subjectKeyWord, setSubjectKeyWord] = useState('');
  const [haveKeyWord, setHaveKeyWork] = useState('');
  // const [notHaveKeyWork, setNotHaveKeyWork] = useState('');
  const [timeRange, setTimeRange] = useState('1_day');
  const [typeKeyWork, setTypeKeyWork] = useState('all');
  const [dateKeyWork, setDateKeyWork] = useState('');
  const [hasAttachmentChecked, setHasAttachmentChecked] = useState(false);
  const [searchTearm, setSearchTearm] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [queryParam, setQueryParam] = useState<BaseQueryParamsType>({});

  const searchService = useCallback(
    async (query: BaseQueryParamsType) => {
      if (typeKeyWork === 'inbox') {
        return getListEmail(query);
      }
      if (typeKeyWork === 'sent') {
        return getSent(query);
      }
      if (typeKeyWork === 'drafts') {
        return getDrafts(query);
      }
      if (typeKeyWork === 'trash') {
        return getTrash(query);
      }
      if (typeKeyWork === 'starred') {
        return getStarred(query);
      }
      return search(query);
    },
    [typeKeyWork],
  );

  const searchTerm = useSelector((state) => state.labelSidebar.searchTerm);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dataSearch = useMemo(() => {
    if (!isShowDropdown) return '';
    let keywordSearch = '';
    if (!_.isEmpty(fromKeyWord)) keywordSearch = `${keywordSearch}from: ${fromKeyWord} `;
    if (!_.isEmpty(toKeyWord)) keywordSearch = `${keywordSearch}to: ${toKeyWord} `;
    if (!_.isEmpty(subjectKeyWord)) keywordSearch = `${keywordSearch}subject: ${subjectKeyWord} `;
    if (!_.isEmpty(haveKeyWord)) keywordSearch = `${keywordSearch}${haveKeyWord} `;
    // if (!_.isEmpty(notHaveKeyWork)) keywordSearch = `${keywordSearch}-${notHaveKeyWork} `;

    if (dateKeyWork) {
      if (timeRange === '1_day')
        keywordSearch = `${keywordSearch} after: ${dayjs()
          .subtract(1, 'day')
          .format('MM/DD/YYYY')} before:${dayjs().subtract(-1, 'day').format('MM/DD/YYYY')}`;
      if (timeRange === '3_day')
        keywordSearch = `${keywordSearch} after: ${dayjs()
          .subtract(3, 'day')
          .format('MM/DD/YYYY')} before:${dayjs().subtract(-3, 'day').format('MM/DD/YYYY')}`;
      if (timeRange === '1_week')
        keywordSearch = `${keywordSearch} after: ${dayjs()
          .subtract(1, 'week')
          .format('MM/DD/YYYY')} before: ${dayjs().subtract(-1, 'week').format('MM/DD/YYYY')} `;
      if (timeRange === '2_weeks')
        keywordSearch = `${keywordSearch} after: ${dayjs()
          .subtract(2, 'week')
          .format('MM/DD/YYYY')} before: ${dayjs().subtract(-2, 'week').format('MM/DD/YYYY')} `;
      if (timeRange === '1_month')
        keywordSearch = `${keywordSearch} after: ${dayjs()
          .subtract(1, 'month')
          .format('MM/DD/YYYY')} before: ${dayjs().subtract(-2, 'month').format('MM/DD/YYYY')}`;
      if (timeRange === '2_months')
        keywordSearch = `${keywordSearch} after: ${dayjs()
          .subtract(2, 'month')
          .format('MM/DD/YYYY')} before: ${dayjs().subtract(-2, 'month').format('MM/DD/YYYY')}`;
      if (timeRange === '6_months')
        keywordSearch = `${keywordSearch} after: ${dayjs()
          .subtract(6, 'month')
          .format('MM/DD/YYYY')} before: ${dayjs().subtract(-6, 'month').format('MM/DD/YYYY')}`;
      if (timeRange === '1_year')
        keywordSearch = `${keywordSearch} after: ${dayjs()
          .subtract(1, 'year')
          .format('MM/DD/YYYY')} before: ${dayjs().subtract(-1, 'year').format('MM/DD/YYYY')} `;
    }

    if (typeKeyWork !== 'all') keywordSearch = `${keywordSearch}type: ${typeKeyWork} `;
    return keywordSearch;
  }, [
    fromKeyWord,
    toKeyWord,
    subjectKeyWord,
    haveKeyWord,
    // notHaveKeyWork,
    timeRange,
    typeKeyWork,
    dateKeyWork,
  ]);

  const handleClear = () => {
    setFromKeyWord([]);
    setToKeyWord([]);
    setSubjectKeyWord('');
    setHaveKeyWork('');
    // setNotHaveKeyWork('');
    setTimeRange('1_day');
    setTypeKeyWork('all');
    setDateKeyWork('');
  };

  const handleCloseDropdown = () => {
    setIsShowDropdown(false);
  };

  const handleSearch = () => {
    setQueryParam({
      ...queryParamsDefault,
      searchBy: ['subject', 'body', 'email'],
      searchValue: searchTearm,
    });
  };

  useEffect(() => {
    if (!_.isEmpty(queryParam)) {
      setIsShowLoading(true);
      searchService(queryParam)
        .then((res) => {
          navigate({
            pathname: '/search',
            search: createSearchParams({ from: fromKeyWord, to: toKeyWord }).toString(),
          });
          if (_.isArray(res)) {
            dispatch(setMail(res));
            return;
          }
          dispatch(setMail(res.data));
        })
        .catch(() => {
          toast.error(t('action_error'));
        })
        .finally(() => {
          setIsShowLoading(false);
        });
    }
  }, [queryParam]);

  const handleApply = () => {
    setQueryParam({
      ...queryParamsDefault,
      searchBy: ['subject', 'body', 'email'],
      searchValue: searchTearm,
    });
    setIsShowDropdown(false);
  };

  useEffect(() => {
    if (searchTerm !== '') {
      setSearchTearm(searchTerm);
      handleSearch();
    }
  }, [searchTerm]);

  useEffect(() => {
    triggerClickOutside(dropdownSearchTabRef, () => {
      setIsShowDropdown(false);
      handleClear();
      setIsFocus(false);
    });
  }, [dropdownSearchTabRef]);

  useEffect(() => {
    if (isShowDropdown) {
      setHaveKeyWork(searchTearm);
    }
  }, [isShowDropdown]);

  const handleEnter = (e: KeyboardEvent) => {
    const { key } = e;
    if (key !== 'Enter') return;
    handleSearch();
  };

  useEffect(() => {
    if (pathname !== '/search') setSearchTearm('');
  }, [pathname]);

  return (
    <div ref={dropdownSearchTabRef} className="relative w-0 py-0 md:w-fit lg:py-3.5">
      <div
        className={twMerge(
          'flex h-12 w-0 items-center justify-start rounded-4xl bg-slate-200 p-0 md:ml-6 md:w-[450px] md:pl-1.5 lg:p-1.5 xl:w-[720px]',
          isFocus && 'bg-slate-50 shadow-md',
        )}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={handleSearch}
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-gray-700 hover:bg-gray-300"
        >
          <HiOutlineSearch size={18} className="hidden md:block" />
        </div>
        <Input
          onFocus={() => setIsFocus(true)}
          size="sm"
          value={searchTearm}
          onChange={(e) => setSearchTearm(e.target.value)}
          placeholder={t('search_in_mailbox') as string}
          className="mx-1 h-full w-0 flex-1 border-none bg-transparent px-[-4px] md:mb-3 md:w-[330px] lg:w-full"
          inputClassName="placeholder-gray-500"
          isShowPlaceholder
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onKeyUp={(e: any) => handleEnter(e)}
          disabled={isShowDropdown}
        />
        <div
          role="button"
          tabIndex={0}
          onClick={() => {
            handleClear();
            handleCloseDropdown();
            setSearchTearm('');
          }}
          className={twMerge(
            'hidden h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-gray-600 transition-all duration-150 hover:bg-slate-100 hover:shadow-md md:ml-auto md:mr-2',
            !_.isEmpty(searchTearm) && 'flex',
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
            isShowDropdown && 'bg-slate-100 shadow-md',
          )}
        >
          <IoOptionsSharp size={20} />
        </div>
      </div>
      {isShowDropdown && (
        <div className=" absolute left-0 top-16 z-10 h-fit w-full rounded-sm border-[0.5px] bg-white px-5 py-3 shadow-box">
          {/* <ItemSearchAdvanced label={t('from')} value={fromKeyWord} onChange={setFromKeyWord} /> */}
          <SearchInput label={t('from')} value={fromKeyWord} onChange={setFromKeyWord} />
          <SearchInput label={t('to')} value={toKeyWord} onChange={setToKeyWord} />
          <ItemSearchAdvanced label={t('subject')} value={subjectKeyWord} onChange={setSubjectKeyWord} />
          <ItemSearchAdvanced label={t('have_the_words')} value={haveKeyWord} onChange={setHaveKeyWork} />
          {/* <ItemSearchAdvanced
            label={t('does_not_have')}
            value={notHaveKeyWork}
            onChange={setNotHaveKeyWork}
          /> */}
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
            {/* <Button
              color="light"
              size="xs"
              className="w-28 bg-gray-100  py-2 text-xs text-gray-700 shadow-none ring-1"
              onClick={handleCloseDropdown}
            >
              {t('create_filter')}
            </Button> */}
            <Button size="xs" className="w-28 py-2 text-xs shadow-none ring-1" onClick={handleApply}>
              {t('apply')}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch;
