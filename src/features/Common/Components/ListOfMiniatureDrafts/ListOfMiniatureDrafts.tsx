/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDrafts } from '../../../../app/Context/DraftContext';
import ComposePopupContainer from '../ComposePopup/ComposeContainer';

const ListOfMiniatureDrafts = () => {
  const draftList = useDrafts();
  return (
    <div id="listOf" className="fixed bottom-0 right-8 z-[60] max-w-[90vw] overflow-hidden p-3 pb-0">
      <div className="flex items-end justify-end gap-2">
        {draftList.map((compose: any) => (
          <ComposePopupContainer
            key={compose.uuid}
            id={compose.uuid}
            compose={compose}
            composeClassName="z-[60]"
          />
        ))}
      </div>
    </div>
  );
};

export default ListOfMiniatureDrafts;
