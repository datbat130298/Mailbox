import _ from 'lodash';
import React, { ForwardedRef } from 'react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { TypeChat } from '../../../../../../app/Enums/commonEnums';
import { BaseQueryParamsType } from '../../../../../../app/Types/commonTypes';
import FilterDatetime from '../../../../WorkSpace/Sent/FilterDatetime';
import FilterDropdown from '../../../FilterDropdown/FilterDropdown';
import Checkbox from '../../../Form/Checkbox';
import SelectViewStyle from '../../../SelectViewStyle/SelectViewStyle';
import HeaderAction from './HeaderAction';
import PaginationTable, { MetaType } from './PaginationTable';

interface HeaderMailTableProps {
  actionArray: Array<string>;
  isShowShadow: boolean;
  isChecked: boolean;
  isShowCheckboxHeader: boolean;
  onClickSelectAll: (e: boolean) => void;
  onCloseViewMailSpace: () => void;
  onClickReadSelectRows: () => void;
  onClickDeleteSelectRows: () => void;
  onClickRestoreSelectRows: () => void;
  type: TypeChat;
  // isShowViewMailSpace?: boolean;
  meta: MetaType;
  onChangePage: (page: number) => void;
  onChangeSearchTerm?: (value: BaseQueryParamsType, type: string) => void;
}

const HeaderMailTable = (
  {
    onChangeSearchTerm,
    meta,
    actionArray,
    isShowShadow,
    isChecked,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isShowCheckboxHeader,
    onClickSelectAll,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onCloseViewMailSpace,
    onClickReadSelectRows,
    onClickDeleteSelectRows,
    onChangePage,
    onClickRestoreSelectRows,
    type,
  }: HeaderMailTableProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        'z-40 flex h-14 w-full justify-between rounded-t-lg px-2 text-gray-700 ',
        isShowShadow ? 'shadow-bottom' : 'border-b-[0.5px]',
        // isShowViewMailSpace && 'w-1/2',
        // !isShowViewMailSpace && 'w-full',
      )}
      ref={ref}
    >
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
        {/* {_.includes(actionArray, 'delete_forrever') && isChecked && (
          <div className="my-3 flex h-8 w-fit rounded-md px-2  hover:bg-gray-100 hover:text-primary-700">
            <div className="h-full w-full text-center text-sm font-semibold leading-8">
              {t('delete_forever')}
            </div>
          </div>
        )} */}
        {/* {_.includes(actionArray, 'view') && !isChecked && (
          <FilterDropdown
            data={filterViewData}
            icon={<FiFilter size={14} />}
            label={t('view')}
            position="left-0 top-[52px]"
          />
        )} */}
        {_.includes(actionArray, 'datetime') && !isChecked && (
          <FilterDatetime onChangeSearchTerm={onChangeSearchTerm} />
        )}
        <HeaderAction
          type={type}
          onClickRestoreSelectRows={onClickRestoreSelectRows}
          showAction={isChecked}
          onClickReadSelectRows={onClickReadSelectRows}
          onClickDeleteSelectRows={onClickDeleteSelectRows}
        />
      </div>
      <div className="hidden h-full w-fit gap-1 sm:flex">
        {!_.isEmpty(meta) && <PaginationTable meta={meta || {}} onChange={onChangePage} />}
        <SelectViewStyle />
      </div>
      <div className="flex h-full w-fit items-center gap-1 sm:hidden">
        {!_.isEmpty(meta) && <PaginationTable meta={meta || {}} onChange={onChangePage} />}
      </div>
    </div>
  );
};

export default React.forwardRef(HeaderMailTable);
