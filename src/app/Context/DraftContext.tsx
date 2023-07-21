// eslint-disable-next-line import/no-extraneous-dependencies
import { nanoid } from 'nanoid';
import { Reducer, createContext, useContext, useReducer } from 'react';
import { OptionLabel } from '../../features/Common/Components/ComposePopup/Components/ComposePopupRecipient/ComposePopupSelectRecipients';
import { ComposeViewTypeEnum } from '../Enums/commonEnums';
import { ComposeType } from '../Types/commonTypes';

export enum DraftActionEnum {
  ADD_COMPOSE = 'add_compose',
  DELETE = 'delete',
  CHANGE_VIEW = 'change_view',
}
interface DraftAction {
  type: DraftActionEnum;
  uuid?: string;
  isShow?: boolean;
  recipient?: readonly OptionLabel[];
  recipientCc?: readonly OptionLabel[];
  recipientBcc?: readonly OptionLabel[];
  subject?: string;
  content?: string;
  viewType: ComposeViewTypeEnum;
}

const DraftsContext = createContext<ComposeType[] | []>([]);

const draftReducer = (state: ComposeType[], action: DraftAction) => {
  switch (action.type) {
    case DraftActionEnum.ADD_COMPOSE: {
      return [
        ...state,
        {
          uuid: nanoid(),
          viewType:
            localStorage.getItem('defaultFullScreen') && localStorage.getItem('defaultFullScreen') === 'true'
              ? ComposeViewTypeEnum.MODAL
              : action.viewType,
          recipient: action?.recipient,
          recipientBcc: action.recipientBcc,
          recipientCc: action.recipientCc,
          subject: action.subject,
          content: action.content,
        },
      ];
    }
    case DraftActionEnum.CHANGE_VIEW: {
      const newArr = state.map((item: ComposeType) => {
        if (item.uuid !== action.uuid) {
          return item;
        }
        return {
          uuid: action.uuid,
          viewType: action.viewType,
          recipient: action?.recipient,
          recipientBcc: action.recipientBcc,
          recipientCc: action.recipientCc,
          subject: action.subject,
          content: action.content,
        };
      });
      return newArr;
    }
    case DraftActionEnum.DELETE: {
      const newArr = state.filter((item: ComposeType) => item.uuid !== action.uuid);
      return newArr;
    }
    default: {
      return state;
    }
  }
};

const DraftsDispatchContext = createContext<React.Dispatch<DraftAction>>(() => {});
interface DraftsProviderProp {
  children: React.ReactNode;
}

export const DraftsProvider = ({ children }: DraftsProviderProp) => {
  const [draftList, dispatch] = useReducer<Reducer<ComposeType[], DraftAction>>(draftReducer, []);

  return (
    <DraftsContext.Provider value={draftList}>
      <DraftsDispatchContext.Provider value={dispatch}>{children}</DraftsDispatchContext.Provider>
    </DraftsContext.Provider>
  );
};

export function useDraftsDispatch() {
  return useContext(DraftsDispatchContext);
}

export function useDrafts() {
  return useContext(DraftsContext);
}
