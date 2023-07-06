import { createContext, Dispatch, SetStateAction } from 'react';
import { ComposeViewTypeEnum } from '../Enums/commonEnums';
import { ComposeType } from '../Types/commonTypes';

interface ContextDraftType {
  composeDraftList: ComposeType[];
  setComposeDraftList: Dispatch<SetStateAction<ComposeType[]>>;
  handleClickCloseComposeItem: (id: number) => void;
  handleShowCompose: (id: number, data: boolean) => void;
  handleAddComposeDraft: (data: ComposeType) => void;
  handleChangeViewType: (id: number, data: ComposeViewTypeEnum) => void;
}

const ContextDraft = createContext<ContextDraftType>({
  composeDraftList: [],
  setComposeDraftList: () => {},
  handleClickCloseComposeItem: () => {},
  handleShowCompose: () => {},
  handleAddComposeDraft: () => {},
  handleChangeViewType: () => {},
});

export default ContextDraft;
