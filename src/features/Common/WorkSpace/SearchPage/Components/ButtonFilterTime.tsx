import dayjs from 'dayjs';
import _ from 'lodash';
import React, { ForwardedRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsCheckLg } from 'react-icons/bs';
import { IoMdArrowDropright } from 'react-icons/io';
import { twMerge } from 'tailwind-merge';
import { BaseQueryParamsType } from '../../../../../app/Types/commonTypes';
import { triggerClickOutside } from '../../../../utils/helpers';
import Button from '../../../Components/Button';
import Input from '../../../Components/Form/Input';

interface ButtonFilterTimeProp {
  onChangeSearchTerm: (value: BaseQueryParamsType) => void;
}

export type ImperativeHandleResetTimeType = {
  handleReset: () => void;
};

const ButtonFilterTime = (
  { onChangeSearchTerm }: ButtonFilterTimeProp,
  ref: ForwardedRef<ImperativeHandleResetTimeType>,
) => {
  const { t } = useTranslation();

  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const [selectTime, setSelectTime] = useState('any_time');
  const [startDate, setStartDate] = useState(new Date().toString());
  const [endDate, setEndDate] = useState(new Date().toString());

  const handleReset = () => {
    setSelectTime('any_time');
  };

  useImperativeHandle(
    ref,
    () => {
      return { handleReset };
    },
    [ref],
  );

  const refTime = useRef<HTMLDivElement>(null);

  const handleClickApply = () => {
    onChangeSearchTerm({
      end: dayjs(endDate).format('YYYY/MM/DD'),
      start: dayjs(startDate).format('YYYY/MM/DD'),
    });
    setIsShowDropDown(false);
  };

  const handleClick = () => {
    setIsShowDropDown((prev) => !prev);
  };

  const handleClickCancel = () => {
    setSelectTime('any_time');
    setStartDate(new Date().toString());
    setEndDate(new Date().toString());
  };

  const filterByDatetime = [
    {
      uuid: 1,
      label: t('any_time'),
      value: 'any_time',
    },
    {
      uuid: 2,
      label: t('last_7_days'),
      value: 'last7days',
    },
    {
      uuid: 3,
      label: t('last_30_days'),
      value: 'last30days',
    },
    {
      uuid: 4,
      label: t('last_6_months'),
      value: 'last6months',
    },
    {
      uuid: 5,
      label: t('custom_range'),
      value: 'custom_range',
    },
  ];

  useEffect(() => {
    if (selectTime !== '' && _.isFunction(onChangeSearchTerm)) {
      if (selectTime === 'last7days') {
        onChangeSearchTerm({
          end: dayjs().format('YYYY/MM/DD'),
          start: dayjs().subtract(7, 'day').format('YYYY/MM/DD'),
        });
      }
      if (selectTime === 'last30days') {
        onChangeSearchTerm({
          end: dayjs().format('YYYY/MM/DD'),
          start: dayjs().subtract(1, 'month').format('YYYY/MM/DD'),
        });
      }
      if (selectTime === 'last6months') {
        onChangeSearchTerm({
          end: dayjs().format('YYYY/MM/DD'),
          start: dayjs().subtract(6, 'month').format('YYYY/MM/DD'),
        });
      }
      if (selectTime === 'any_time') {
        onChangeSearchTerm({
          end: dayjs().format('YYYY/MM/DD'),
          start: dayjs().subtract(2, 'year').format('YYYY/MM/DD'),
        });
      }
    }
  }, [selectTime]);

  useEffect(() => {
    triggerClickOutside(refTime, () => {
      setIsShowDropDown(false);
      if (selectTime === 'custom_range') setSelectTime('any_time');
    });
  }, [refTime]);

  return (
    <div className="relative" ref={refTime}>
      <div
        className={twMerge(
          'flex w-max items-center justify-between gap-2 rounded-md bg-[#F5F6F8] px-2 py-1.5 text-gray-700 shadow-none transition-all',
          selectTime !== 'any_time' && ' bg-blue-950 text-white',
        )}
        role="button"
        tabIndex={0}
        onClick={handleClick}
      >
        {selectTime !== 'any_time' && <BsCheckLg />}

        <p className="line-clamp-1 text-sm font-semibold">{t(selectTime)}</p>

        <IoMdArrowDropright
          size={20}
          className={twMerge(' ', isShowDropDown && 'rotate-90 transition-all')}
        />
      </div>
      <div
        className={twMerge(
          'absolute left-0 top-full z-50 hidden h-fit w-fit rounded-md bg-white p-1 text-gray-700 shadow-box',
          isShowDropDown && 'block',
          isShowDropDown && selectTime === 'custom_range' && 'block',
        )}
      >
        {selectTime !== 'custom_range' &&
          filterByDatetime?.map((item) => (
            <div
              className={twMerge(
                'flex h-8 w-full rounded-sm hover:bg-slate-200 hover:text-primary-700',
                selectTime === item?.value && 'bg-slate-200 text-primary-700',
              )}
              key={item.uuid}
              role="button"
              tabIndex={0}
              onClick={() => {
                setSelectTime(item.value);
                if (item.value !== 'custom_range') setIsShowDropDown(false);
              }}
            >
              <div className="h-full w-40 px-4 text-start text-sm leading-8">{item.label}</div>
            </div>
          ))}
        {selectTime === 'custom_range' && (
          <div className="h-fit w-max p-3">
            <div className="flex justify-center gap-x-1">
              <Input
                isShowPlaceholder
                placeholder={t('start_date') as string}
                size="sm"
                className="w-40 border"
                type="date"
                value={dayjs(startDate).format('YYYY-MM-DD')}
                inputClassName="text-sm leading-7"
                onChange={(e) => setStartDate(e.target.value)}
                max={dayjs(new Date()).format('YYYY-MM-DD')}
              />
              <Input
                isShowPlaceholder
                placeholder={t('end_date') as string}
                size="sm"
                className="w-40  border"
                type="date"
                value={dayjs(endDate).format('YYYY-MM-DD')}
                inputClassName="text-sm leading-7"
                onChange={(e) => setEndDate(e.target.value)}
                max={dayjs(new Date()).format('YYYY-MM-DD')}
              />
            </div>
            <div className="mt-4 flex justify-end gap-x-2 border-t pt-3">
              <Button
                onClick={handleClickCancel}
                color="light"
                size="xs"
                className="w-28 bg-gray-100  py-2 text-xs text-gray-700 shadow-none  ring-1"
              >
                {t('cancel')}
              </Button>
              <Button size="xs" className="w-28 py-2 text-xs shadow-none ring-1" onClick={handleClickApply}>
                {t('apply')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.forwardRef(ButtonFilterTime);
