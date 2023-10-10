import dayjs from 'dayjs';
import _ from 'lodash';
import { Dispatch, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useInViewport } from 'react-in-viewport';
import { twMerge } from 'tailwind-merge';
import { TypeChat } from '../../../../app/Enums/commonEnums';
import { MailType } from '../../../../app/Types/commonTypes';
import MailItemSkeleton from './MailItemSkeleton';
import MailItem from './MailTableContainer/MailItem/MailItem';
import MailItemLabelMonth from './MailTableContainer/MailItem/MailItemLabelMonth';

interface MailTableProps {
  data: Array<MailType>;
  isLoading: boolean;
  emptyComponent?: React.ReactNode;
  onChangeShowShadow?: Dispatch<SetStateAction<boolean>>;
  onChangeSelectRows: (idRows: number, checked: boolean) => void;
  selectRows: Array<number>;
  onClickShowMail?: (mail: MailType) => void;
  selectedMail: MailType | null;
  type: TypeChat;
  onClickDeleteMail?: (id: number) => void;
  onClickRestoreMail?: (id: number) => void;
  onRateStar?: (id: number, value: boolean) => void;
  unReadEmail?: (ids: Array<number>) => void;
  readEmail?: (ids: Array<number>) => void;
  onRemoveItem?: (id: number) => void;
}

const MailTable = ({
  onRemoveItem,
  onRateStar,
  onClickDeleteMail,
  onClickRestoreMail,
  type,
  data,
  isLoading,
  emptyComponent,
  onChangeShowShadow,
  onChangeSelectRows,
  onClickShowMail,
  selectRows,
  selectedMail,
  unReadEmail,
  readEmail,
}: MailTableProps) => {
  const detectLoadingRef = useRef<HTMLDivElement>(null);
  const { inViewport } = useInViewport(detectLoadingRef);
  const [newData, setNewData] = useState<Array<MailType | string>>([]);

  useLayoutEffect(() => {
    if (!_.isFunction(onChangeShowShadow)) return;
    if (inViewport) {
      onChangeShowShadow(false);
    } else {
      onChangeShowShadow(true);
    }
  }, [inViewport, onChangeShowShadow]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const arrayMonth: any = [];
    data.forEach((dataItem) => {
      if (_.isEmpty(arrayMonth)) {
        arrayMonth.push(dayjs(dataItem.created_at).format('YYYY-MM'));
        setNewData([dayjs(dataItem.created_at).format('YYYY-MM-DD'), dataItem]);
        return;
      }
      if (
        dayjs(dayjs(dataItem.created_at).format('YYYY-MM')).diff(
          arrayMonth[arrayMonth.length - 1],
          'month',
        ) === 0
      ) {
        setNewData((prev) => [...prev, dataItem]);
        return;
      }
      arrayMonth.push(dayjs(dataItem.created_at).format('YYYY-MM'));
      setNewData((prev) => [...prev, ...[dayjs(dataItem.created_at).format('YYYY-MM-DD'), dataItem]]);
    });
  }, [data]);

  return (
    <div
      className={twMerge(
        'overflow-overlay -z-10 h-[calc(100%-55px)] w-full gap-y-4  overflow-hidden overflow-y-auto pb-6',
      )}
    >
      <div className="h-fit w-full">
        <div className="h-0 w-full" ref={detectLoadingRef} />
        {_.isEmpty(data) &&
          isLoading &&
          Array.from({ length: 17 }).map((_1, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <MailItemSkeleton key={index} />
          ))}
        {!_.isEmpty(data) &&
          !isLoading &&
          newData?.map((item) => {
            if (typeof item === 'string') {
              return <MailItemLabelMonth date={item} />;
            }
            return (
              <MailItem
                readEmail={readEmail}
                onRemoveItem={onRemoveItem}
                unReadEmail={unReadEmail}
                onRateStar={onRateStar}
                onClickDeleteMail={onClickDeleteMail}
                onClickRestoreMail={onClickRestoreMail}
                type={type}
                selectedMail={selectedMail}
                key={item.id}
                mail={item}
                selected={_.includes(selectRows, item.id)}
                onChangeSelectRow={onChangeSelectRows}
                onClickShowMail={onClickShowMail || (() => null)}
              />
            );
          })}
        {_.isEmpty(data) && !isLoading && emptyComponent}
        {!_.isEmpty(data) && !isLoading && (
          <div className="flex-center my-4 h-fit w-full text-center text-gray-700 ">
            <div>
              <div className="h-fit w-full text-sm hover:underline">Program Policies</div>
              <div className="h-fit w-full text-sm hover:underline">Powered by SENDGPT</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default MailTable;
