import _ from 'lodash';
import React, { ForwardedRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdOutlineScheduleSend, MdRefresh } from 'react-icons/md';
import { useSearchParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { TypeChat } from '../../../../../../app/Enums/commonEnums';
import { getMailFromServer } from '../../../../../../app/Services/ConversationService/ConversationService';
import { BaseQueryParamsType } from '../../../../../../app/Types/commonTypes';
import useNotify from '../../../../../Hooks/useNotify';
import { queryParamsDefault } from '../../../../../utils/helpers';
import FilterDatetime from '../../../../WorkSpace/Sent/FilterDatetime';
import FilterDropdown, { FilterItemType } from '../../../FilterDropdown/FilterDropdown';
import Checkbox from '../../../Form/Checkbox';
import SelectViewStyle from '../../../SelectViewStyle/SelectViewStyle';
import ButtonHeaderTable from './ButtonHeaderTable';
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
  onSelectRead: () => void;
  onSelectUnRead: () => void;
  onSelectAllDropdown: () => void;
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
    onSelectRead,
    onSelectUnRead,
    onSelectAllDropdown,
  }: HeaderMailTableProps,
  ref: ForwardedRef<HTMLDivElement>,
) => {
  const { t } = useTranslation();
  const [, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useNotify();

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

  const filterCheckboxData = [
    {
      uuid: 1,
      label: t('all'),
      value: 'all',
      onClick: onSelectAllDropdown,
    },
    {
      uuid: 2,
      label: t('unread'),
      value: 'unread',
      onClick: onSelectUnRead,
    },
    {
      uuid: 3,
      label: t('read'),
      value: 'read',
      onClick: onSelectRead,
    },
  ];

  return (
    <>
      <div
        className={twMerge(
          'hidden w-full items-center justify-start gap-3 px-4 pt-3 text-gray-700 ',
          type === TypeChat.SCHEDULE && 'flex',
        )}
      >
        <div className="flex h-full items-start">
          <MdOutlineScheduleSend size={24} />
        </div>
        <p className="text-left text-gray-600">Messages in Scheduled will be sent at their scheduled time.</p>
      </div>
      <div
        className={twMerge(
          'z-40 flex h-14 w-full justify-between rounded-t-lg px-2 text-gray-700 ',
          isShowShadow ? 'shadow-bottom' : 'border-b',
        )}
        ref={ref}
      >
        <div className="flex h-full w-fit items-center gap-x-1 md:gap-x-4">
          <div className="group flex h-8 w-fit rounded-md bg-[#F5F6F8] px-2 hover:bg-[#ECEDF0]">
            <div className="flex-center h-full w-max">
              <Checkbox
                checked={isChecked}
                indeterminate={isChecked}
                onChange={(e) => onClickSelectAll(e.target.checked)}
                className=""
                classNameBorder="border-gray-600"
              />
            </div>
            <FilterDropdown
              elementStyle={<div className="hidden" />}
              data={filterCheckboxData as FilterItemType[]}
              position="-left-6 top-10"
              type={type}
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
          <ButtonHeaderTable
            icon={<MdRefresh size={20} className={twMerge('animate-spin', !isLoading && 'animate-none')} />}
            title={t('refresh')}
            onClick={handleClickRefresh}
          />
        </div>
        <div className="hidden h-full w-fit gap-2 sm:flex">
          {!_.isEmpty(meta) && <PaginationTable meta={meta || {}} onChange={onChangePage} />}
          <SelectViewStyle />
        </div>
        <div className="flex h-full w-fit items-center gap-1 sm:hidden">
          {!_.isEmpty(meta) && <PaginationTable meta={meta || {}} onChange={onChangePage} />}
        </div>
      </div>
    </>
  );
};

export default React.forwardRef(HeaderMailTable);
