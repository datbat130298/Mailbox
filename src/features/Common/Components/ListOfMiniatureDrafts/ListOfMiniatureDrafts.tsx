import { Dispatch, SetStateAction } from 'react';
import { ComposeType } from '../../../../app/Types/commonTypes';
import ComposePopupContainer from '../ComposePopup/ComposeContainer';

interface ListOfMiniatureDraftsProps {
  composeDraftList: ComposeType[];
  setComposeDraftList: Dispatch<SetStateAction<ComposeType[]>>;
  handleShowCompose: (id: number, data: boolean) => void;
  handleClickCloseComposeItem: (id: number) => void;
}

const ListOfMiniatureDrafts = ({
  handleShowCompose,
  composeDraftList,
  setComposeDraftList,
  handleClickCloseComposeItem,
}: ListOfMiniatureDraftsProps) => {
  return (
    <div className="fixed bottom-0 right-8 z-[60] w-[90vw] overflow-hidden p-3 pb-0">
      <div className="flex items-end justify-end gap-2">
        {composeDraftList?.map((compose, id) => (
          <ComposePopupContainer
            handleClickCloseComposeItem={handleClickCloseComposeItem}
            composeDraftList={composeDraftList}
            handleShowCompose={handleShowCompose}
            setComposeDraftList={setComposeDraftList}
            id={id}
            compose={compose}
            composeClassName="z-[60]"
          />
        ))}
      </div>
    </div>
  );
};

export default ListOfMiniatureDrafts;
