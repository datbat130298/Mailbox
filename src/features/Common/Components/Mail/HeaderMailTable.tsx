import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { FiFilter } from 'react-icons/fi';
import { IoArrowBackOutline } from 'react-icons/io5';
import { twMerge } from 'tailwind-merge';
import FilterDatetime from '../../WorkSpace/Sent/FilterDatetime';
import FilterDropdown from '../FilterDropdown/FilterDropdown';
import Checkbox from '../Form/Checkbox';
import Pagination from '../Pagination/Pagination';
import SelectViewStyle from '../SelectViewStyle/SelectViewStyle';
import HeaderAction from './HeaderAction';

interface HeaderMailTableProps {
  actionArray: Array<string>;
  isShowShadow: boolean;
  isChecked: boolean;
  isShowCheckboxHeader: boolean;
  onClickSelectAll: (e: boolean) => void;
  onCloseViewMailSpace: () => void;
  onClickNextButton: () => false | void;
  onClickPrevButton: () => false | void;
}

const HeaderMailTable = ({
  actionArray,
  isShowShadow,
  isChecked,
  isShowCheckboxHeader,
  onClickSelectAll,
  onCloseViewMailSpace,
  onClickNextButton,
  onClickPrevButton,
}: HeaderMailTableProps) => {
  const { t } = useTranslation();
  const filterCheckboxData = [
    {
      uuid: 1,
      label: t('all'),
      value: 'all',
    },
    {
      uuid: 2,
      label: t('unread'),
      value: 'unread',
    },
    {
      uuid: 3,
      label: t('read'),
      value: 'read',
    },
  ];

  const filterViewData = [
    {
      uuid: 1,
      label: t('all'),
      value: 'all',
    },
    {
      uuid: 2,
      label: t('sent'),
      value: 'sent',
    },
    {
      uuid: 3,
      label: t('drafts'),
      value: 'drafts',
    },
    {
      uuid: 4,
      label: t('trash'),
      value: 'trash',
    },
  ];

  return (
    <div
      className={twMerge(
        'absolute left-0 top-0 z-40 flex h-14 w-full justify-between rounded-t-lg px-2 text-gray-700 ',
        isShowShadow ? 'shadow-bottom' : 'border-b-[0.5px]',
      )}
    >
      {!isShowCheckboxHeader && (
        <div className="flex h-full w-fit gap-x-0.5">
          <div className="group my-3 flex h-8 w-fit rounded-md px-2 hover:bg-gray-100">
            <div className="flex-center h-full w-max">
              <Checkbox
                checked={isChecked}
                indeterminate={isChecked}
                onChange={(e) => onClickSelectAll(e.target.checked)}
                className="group-hover:border-primary-700 group-hover:text-primary-700"
              />
            </div>
            <FilterDropdown
              elementStyle={<div className="hidden" />}
              data={filterCheckboxData}
              position="-left-6 top-10"
            />
          </div>
          {_.includes(actionArray, 'delete_forrever') && isChecked && (
            <div className="my-3 flex h-8 w-fit rounded-md px-2  hover:bg-gray-100 hover:text-primary-700">
              <div className="h-full w-full text-center text-sm font-semibold leading-8">
                {t('delete_forever')}
              </div>
            </div>
          )}
          {_.includes(actionArray, 'view') && !isChecked && (
            <FilterDropdown
              data={filterViewData}
              icon={<FiFilter size={14} />}
              label={t('view')}
              position="left-0 top-[52px]"
            />
          )}
          {_.includes(actionArray, 'datetime') && !isChecked && <FilterDatetime />}
          <HeaderAction showAction={isChecked} />
        </div>
      )}
      {isShowCheckboxHeader && (
        <div className="flex justify-start">
          <div
            role="button"
            tabIndex={0}
            onClick={onCloseViewMailSpace}
            className="my-3 ml-1 flex h-8 w-fit rounded-md px-2  hover:bg-gray-100 hover:text-primary-700"
          >
            <div className="flex-center h-full w-max">
              <IoArrowBackOutline size={14} />
            </div>
            <div className="ml-1 text-sm leading-8">{t('back')}</div>
          </div>
          <HeaderAction showAction={isShowCheckboxHeader} />
        </div>
      )}
      <div className="flex h-full w-fit">
        <Pagination
          isHiddenRange={isShowCheckboxHeader}
          onClickNextButton={onClickNextButton}
          onClickPrevButton={onClickPrevButton}
        />
        {!isShowCheckboxHeader && <SelectViewStyle />}
      </div>
    </div>
  );
};

export default HeaderMailTable;
