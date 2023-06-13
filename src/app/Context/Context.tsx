import { createContext, Dispatch, SetStateAction } from 'react';
import { ComposeType } from '../Types/commonTypes';

interface ContextDraftType {
  draft: ComposeType[];
  setDraft: Dispatch<SetStateAction<ComposeType[]>>;
  removeItem: (id: number) => void;
  updateDraft: (id: number, data: ComposeType) => void;
  setIsShowDraft: (id: number, data: boolean) => void;
}

const ContextDraft = createContext<ContextDraftType>({
  draft: [],
  setDraft: () => {},
  removeItem: () => {},
  updateDraft: () => {},
  setIsShowDraft: () => {},
});

export default ContextDraft;
