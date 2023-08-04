import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { useDrafts } from '../../../../app/Context/DraftContext';
import { ComposeViewTypeEnum } from '../../../../app/Enums/commonEnums';
import { ComposeType } from '../../../../app/Types/commonTypes';
import ComposePopupContainer from '../ComposePopup/ComposeContainer';

const ListOfMiniatureDrafts = () => {
  const draftList = useDrafts();

  const maxWidthView = useMemo(() => {
    if (draftList.length < 4) return 'max-w-[1390px]';
    if (draftList.length >= 4) {
      let count = 0;
      draftList.forEach((item: ComposeType, index: number) => {
        if (index < draftList.length - 4) return count;
        // eslint-disable-next-line no-return-assign
        if (item.viewType === ComposeViewTypeEnum.POPUP) return (count += 1);
        return count;
      });
      if (count === 1) return 'max-w-[1420px]';
      if (count === 0) return 'max-w-[1160px]';
    }
    return 'max-w-[1390px]';
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
          key={compose.uuid}
          id={compose.uuid}
          compose={compose}
          composeClassName="z-[60]"
        />
      ))}
    </div>
  );
};

export default ListOfMiniatureDrafts;
