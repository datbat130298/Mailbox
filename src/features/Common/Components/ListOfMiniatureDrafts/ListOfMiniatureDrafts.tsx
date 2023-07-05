import { useContext } from 'react';
import ContextDraft from '../../../../app/Context/Context';
import ComposePopupContainer from '../ComposePopup/ComposeContainer';

const ListOfMiniatureDrafts = () => {
  const { composeDraftList } = useContext(ContextDraft);

  return (
    <div id="listOf" className="fixed bottom-0 right-8 z-[60] max-w-[90vw] overflow-hidden p-3 pb-0">
      <div className="flex items-end justify-end gap-2">
        {composeDraftList.map((compose) => (
          <ComposePopupContainer compose={compose} composeClassName="z-[60]" />
        ))}
      </div>
    </div>
  );
};

export default ListOfMiniatureDrafts;
