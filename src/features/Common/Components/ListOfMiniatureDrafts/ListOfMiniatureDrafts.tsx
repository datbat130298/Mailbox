import { useMemo, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useDrafts } from '../../../../app/Context/DraftContext';
import { ComposeViewTypeEnum } from '../../../../app/Enums/commonEnums';
import { ComposeType } from '../../../../app/Types/commonTypes';
import ComposePopupContainer from '../ComposePopup/ComposeContainer';
import LoadingHeader from '../Loading/LoadingHeader';

const ListOfMiniatureDrafts = () => {
  const draftList = useDrafts();
  const [isLoading, setIsLoading] = useState(false);
  const maxWidthView = useMemo(() => {
    if (window.innerWidth < 1536) {
      if (draftList.length < 3) return 'max-w-[1400px]';
      if (draftList.length >= 3) {
        let count = 0;
        draftList.forEach((item: ComposeType, index: number) => {
          if (index < draftList.length - 4) return count;
          if (item.viewType === ComposeViewTypeEnum.POPUP) {
            count += 1;
            return count;
          }
          return count;
        });
        if (count === 1) return 'max-w-[1210px]';
        if (count === 0) return 'max-w-[870px]';
      }
      return 'max-w-[1400px]';
    }
    if (draftList.length < 4) return 'max-w-[1550px]';
    if (draftList.length >= 4) {
      let count = 0;
      draftList.forEach((item: ComposeType, index: number) => {
        if (index < draftList.length - 4) return count;
        if (item.viewType === ComposeViewTypeEnum.POPUP) {
          count += 1;
          return count;
        }
        return count;
      });
      if (count === 1) return 'max-w-[1500px]';
      if (count === 0) return 'max-w-[1160px]';
    }
    return 'max-w-[1550px]';
  }, [draftList]);

  return (
    <div
      id="listOf"
      className={twMerge(
        'fixed bottom-0 right-8 z-[60] flex items-end justify-end gap-2 overflow-hidden p-3 pb-0',
        maxWidthView,
      )}
    >
      {draftList.map((compose: ComposeType) => (
        <ComposePopupContainer
          setIsLoading={setIsLoading}
          key={compose.uuid}
          id={compose.uuid}
          compose={compose}
          composeClassName="z-[60]"
        />
      ))}
      <LoadingHeader isShow={isLoading} />
    </div>
  );
};

export default ListOfMiniatureDrafts;
