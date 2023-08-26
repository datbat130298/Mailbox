import _ from 'lodash';
import { Dispatch, SetStateAction, useLayoutEffect, useRef } from 'react';
import { useInViewport } from 'react-in-viewport';
import { twMerge } from 'tailwind-merge';
import { MailType } from '../../../../app/Types/commonTypes';
import MailItem from './MailItem';
import MailItemSkeleton from './MailItemSkeleton';

interface MailTableProps {
  data: Array<MailType>;
  isLoading: boolean;
  emptyComponent?: React.ReactNode;
  onChangeShowShadow?: Dispatch<SetStateAction<boolean>>;
  onChangeSelectRows: (idRows: number, checked: boolean) => void;
  selectRows: Array<number>;
  onClickShowMail?: (mail: MailType) => void;
  selectedMail: MailType | null;
  type: string;
}

const MailTable = ({
  type,
  data,
  isLoading,
  emptyComponent,
  onChangeShowShadow,
  onChangeSelectRows,
  onClickShowMail,
  selectRows,
  selectedMail,
}: MailTableProps) => {
  const detectLoadingRef = useRef<HTMLDivElement>(null);
  const { inViewport } = useInViewport(detectLoadingRef);

  useLayoutEffect(() => {
    if (!_.isFunction(onChangeShowShadow)) return;
    if (inViewport) {
      onChangeShowShadow(false);
    } else {
      onChangeShowShadow(true);
    }
  }, [inViewport, onChangeShowShadow]);

  return (
    <div
      className={twMerge('overflow-overlay -z-10 h-full w-full gap-y-4  overflow-hidden overflow-y-auto ')}
    >
      <div className="h-fit w-full">
        <div className="h-[1px] w-full" ref={detectLoadingRef} />
        {_.isEmpty(data) &&
          isLoading &&
          Array.from({ length: 17 }).map((_1, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <MailItemSkeleton key={index} />
          ))}
        {!_.isEmpty(data) &&
          !isLoading &&
          data?.map((item) => (
            <MailItem
              type={type}
              selectedMail={selectedMail}
              key={item.id}
              mail={item}
              selected={_.includes(selectRows, item.id)}
              onChangeSelectRow={onChangeSelectRows}
              onClickShowMail={onClickShowMail || (() => null)}
            />
          ))}
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
