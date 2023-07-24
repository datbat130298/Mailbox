import _ from 'lodash';
import { Dispatch, SetStateAction, useLayoutEffect, useRef } from 'react';
import { useInViewport } from 'react-in-viewport';
import { MailType } from '../../../../app/Types/commonTypes';
import MailItem from './MailItem';
import MailItemSleleton from './MailItemSkeleton';

interface MailTableProps {
  data: Array<MailType>;
  isLoading: boolean;
  emptyComponent?: React.ReactNode;
  onChangeShowShadow?: Dispatch<SetStateAction<boolean>>;
  onChangeSelectRows: (idRows: number, checked: boolean) => void;
  selectRows: Array<number>;
  onClickShowMail: (mail: MailType) => void;
}

const MailTableNewLayout = ({
  data,
  isLoading,
  emptyComponent,
  onChangeShowShadow,
  onChangeSelectRows,
  onClickShowMail,
  selectRows,
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
    <div className="overflow-overlay -z-10 h-full w-full gap-y-4  overflow-hidden overflow-y-auto ">
      <div className="h-fit w-full">
        <div className="h-[1px] w-full" ref={detectLoadingRef} />
        {_.isEmpty(data) &&
          isLoading &&
          Array.from({ length: 17 }).map((_1, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <MailItemSleleton key={index} />
          ))}
        {!_.isEmpty(data) &&
          !isLoading &&
          data?.map((item) => (
            <MailItem
              key={item.uuid}
              mail={item}
              selected={_.includes(selectRows, item.uuid)}
              onChangeSelectRows={onChangeSelectRows}
              onClickShowMail={onClickShowMail}
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
export default MailTableNewLayout;
