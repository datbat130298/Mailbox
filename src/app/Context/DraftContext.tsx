// eslint-disable-next-line import/no-extraneous-dependencies
import { nanoid } from 'nanoid';
import { createContext, Reducer, useContext, useReducer } from 'react';
import { EmailType } from '../../features/Common/Components/SelectMultiEmail/SelectMultiEmail';
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
  recipient?: EmailType[];
  recipientCc?: EmailType[];
  recipientBcc?: EmailType[];
  subject?: string;
  content?: string;
  viewType: ComposeViewTypeEnum;
}

const DraftsContext = createContext<ComposeType[] | []>([]);

const handleAddCompose = (state: ComposeType[], newCompose: ComposeType) => {
  let newArr = [];
  if (state.length < 2) {
    newArr = [
      ...state,
      {
        uuid: nanoid(),
        viewType:
          localStorage.getItem('defaultFullScreen') && localStorage.getItem('defaultFullScreen') === 'true'
            ? ComposeViewTypeEnum.MODAL
            : newCompose.viewType,
        recipient: newCompose?.recipient,
        recipientBcc: newCompose.recipientBcc,
        recipientCc: newCompose.recipientCc,
        subject: newCompose.subject,
        content: newCompose.content,
      },
    ];
    return newArr;
  }
  if (state.length === 2) {
    newArr = state.map((item: ComposeType, index: number) => {
      if (index === state.length - 2) {
        return {
          ...item,
          viewType: ComposeViewTypeEnum.ZOOM_OUT,
        };
      }
      return item;
    });
    return [
      ...newArr,
      {
        uuid: nanoid(),
        viewType:
          localStorage.getItem('defaultFullScreen') && localStorage.getItem('defaultFullScreen') === 'true'
            ? ComposeViewTypeEnum.MODAL
            : newCompose.viewType,
        recipient: newCompose?.recipient,
        recipientBcc: newCompose.recipientBcc,
        recipientCc: newCompose.recipientCc,
        subject: newCompose.subject,
        content: newCompose.content,
      },
    ];
  }
  newArr = state.map((item: ComposeType, index: number) => {
    if (index <= state.length - 2) {
      return {
        ...item,
        viewType: ComposeViewTypeEnum.ZOOM_OUT,
      };
    }
    return item;
  });

  return [
    ...newArr,
    {
      uuid: nanoid(),
      viewType:
        localStorage.getItem('defaultFullScreen') && localStorage.getItem('defaultFullScreen') === 'true'
          ? ComposeViewTypeEnum.MODAL
          : newCompose.viewType,
      recipient: newCompose?.recipient,
      recipientBcc: newCompose.recipientBcc,
      recipientCc: newCompose.recipientCc,
      subject: newCompose.subject,
      content: newCompose.content,
    },
  ];
};

const handleChangeView = (state: ComposeType[], compose: ComposeType) => {
  let arrDraft: ComposeType[] = [];
  let count = 0;
  let isSpecial = false;
  arrDraft = [...state.slice(-4)];
  arrDraft?.forEach((item: ComposeType, index: number) => {
    if (
      (state[state.length - 4]?.viewType === ComposeViewTypeEnum.POPUP &&
        compose.uuid !== item.uuid &&
        compose.viewType === ComposeViewTypeEnum.POPUP) ||
      (compose.uuid === item.uuid && index === arrDraft.length - 4)
    ) {
      isSpecial = true;
    }
    if (item.viewType === ComposeViewTypeEnum.POPUP) {
      count += 1;
      return count;
    }
    return count;
  });

  if (count <= 1) {
    if (isSpecial) {
      const newArr = state.map((item: ComposeType) => {
        if (item.uuid !== compose.uuid) {
          return {
            ...item,
            viewType: ComposeViewTypeEnum.ZOOM_OUT,
          };
        }
        return {
          uuid: compose.uuid,
          viewType: compose.viewType,
          recipient: compose?.recipient,
          recipientBcc: compose.recipientBcc,
          recipientCc: compose.recipientCc,
          subject: compose.subject,
          content: compose.content,
        };
      });
      return newArr;
    }
    const newArr = state.map((item: ComposeType) => {
      if (item.uuid !== compose.uuid) {
        return item;
      }
      return {
        uuid: compose.uuid,
        viewType: compose.viewType,
        recipient: compose?.recipient,
        recipientBcc: compose.recipientBcc,
        recipientCc: compose.recipientCc,
        subject: compose.subject,
        content: compose.content,
      };
    });
    return newArr;
  }
  if (count === 2 && compose.viewType === ComposeViewTypeEnum.ZOOM_OUT) {
    const newArr = state.map((item: ComposeType) => {
      if (item.uuid !== compose.uuid) {
        return item;
      }
      return {
        uuid: compose.uuid,
        viewType: compose.viewType,
        recipient: compose?.recipient,
        recipientBcc: compose.recipientBcc,
        recipientCc: compose.recipientCc,
        subject: compose.subject,
        content: compose.content,
      };
    });
    return newArr;
  }
  if (count === 2 && compose.viewType === ComposeViewTypeEnum.POPUP) {
    const arrState = state.map((item: ComposeType) => {
      if (item.uuid === compose.uuid) {
        return {
          ...item,
          viewType: compose.viewType,
        };
      }
      return {
        ...item,
        viewType: ComposeViewTypeEnum.ZOOM_OUT,
      };
    });
    return arrState;
  }
  return state;
};

const draftReducer = (state: ComposeType[], action: DraftAction) => {
  switch (action.type) {
    case DraftActionEnum.ADD_COMPOSE: {
      return handleAddCompose(state, action);
    }
    case DraftActionEnum.CHANGE_VIEW: {
      return handleChangeView(state, action);
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
