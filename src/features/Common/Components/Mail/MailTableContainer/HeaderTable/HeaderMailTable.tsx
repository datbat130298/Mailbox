import _ from 'lodash';
import React, { ForwardedRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdRefresh } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { TypeChat } from '../../../../../../app/Enums/commonEnums';
import { getMailFromServer } from '../../../../../../app/Services/ConversationService/ConversationService';
import { BaseQueryParamsType } from '../../../../../../app/Types/commonTypes';
import useNotify from '../../../../../Hooks/useNotify';
import { queryParamsDefault } from '../../../../../utils/helpers';
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
  onClickUnReadSelectRows: () => void;
  type: TypeChat;
  // isShowViewMailSpace?: boolean;
  meta: MetaType;
  onChangePage?: (page: number) => void;
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
    onClickUnReadSelectRows,
    type,
  }: HeaderMailTableProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { t } = useTranslation();
  const [, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useNotify();
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

  const handleClickRefresh = () => {
    setIsLoading(true);
    getMailFromServer()
      .catch(() => toast.error(t('action_error')))
      .finally(() => {
        if (_.isFunction(onChangeSearchTerm)) {
          onChangeSearchTerm(queryParamsDefault);
          setIsLoading(false);
          return;
        }
        setSearchParams('');
        setIsLoading(false);
      });
  };

  return (
    <div
      className={twMerge(
        'z-40 flex h-14 w-full justify-between rounded-t-lg px-2 text-gray-700 ',
        isShowShadow ? 'shadow-bottom' : 'border-b-[0.5px]',
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
        {_.includes(actionArray, 'datetime') && !isChecked && (
          <FilterDatetime onChangeSearchTerm={onChangeSearchTerm} />
        )}
        <HeaderAction
          type={type}
          onClickUnReadSelectRows={onClickUnReadSelectRows}
          onClickRestoreSelectRows={onClickRestoreSelectRows}
          showAction={isChecked}
          onClickReadSelectRows={onClickReadSelectRows}
          onClickDeleteSelectRows={onClickDeleteSelectRows}
        />
        <div
          className=" z-10 my-3 ml-1 flex h-8 items-center justify-center gap-1.5 rounded-md px-2 text-sm hover:bg-slate-100 hover:text-primary-700"
          role="button"
          tabIndex={0}
          onClick={handleClickRefresh}
        >
          <MdRefresh size={20} className={twMerge('animate-spin', !isLoading && 'animate-none')} />
          <p className="hidden lg:block">{t('refresh')}</p>
        </div>
      </div>
      <div className="hidden h-full w-fit gap-2 sm:flex">
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
