import _ from 'lodash';
import { Dispatch, SetStateAction, useLayoutEffect, useRef } from 'react';
import { useInViewport } from 'react-in-viewport';
import MailItem from './MailItem';
import MailItemSleleton from './MailItemSkeleton';

interface MailTableProps {
  data: Array<any>;
  onChangeShowShadow?: Dispatch<SetStateAction<boolean>>;
}

const MailTable = ({ data, onChangeShowShadow }: MailTableProps) => {
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
    <div className="overflow-overlay -z-10 h-full w-full gap-y-4  overflow-hidden overflow-y-auto">
      <div className="h-fit w-full">
        <div className="h-[1px] w-full" ref={detectLoadingRef} />
        {_.isEmpty(data)
          ? Array.from({ length: 17 }).map((_1, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <MailItemSleleton key={index} />
            ))
          : data?.map((item) => <MailItem key={item.uuid} mail={item} />)}
      </div>
    </div>
  );
};
export default MailTable;
