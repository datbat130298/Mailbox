import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ValueLabelTable } from '../../features/Common/WorkSpace/Settings/LabelTable';

const systemLabels = [
  {
    id: 1,
    to: '/inbox',
    name: 'inbox',
    display: [],
  },
  {
    id: 2,
    to: '/starred',
    name: 'starred',
    display: [
      {
        hide: false,
      },
      {
        show: true,
      },
    ],
  },
  {
    id: 3,
    to: '/chats',
    name: 'chats',
    display: [
      {
        hide: true,
      },
      {
        show: false,
      },
    ],
  },
  {
    id: 4,
    to: '/sent',
    name: 'sent',
    display: [
      {
        hide: false,
      },
      {
        show: true,
      },
    ],
  },
  {
    id: 5,
    to: '/schedule',
    name: 'schedule',
    display: [
      {
        hide: false,
      },
      {
        show: true,
      },
    ],
  },
  {
    id: 6,
    to: '/spam',
    name: 'spam',
    display: [
      {
        hide: true,
      },
      {
        show: false,
      },
    ],
  },
  {
    id: 7,
    to: '/trash',
    name: 'trash',
    quantity: 13,
    display: [
      {
        hide: false,
      },
      {
        show: true,
      },
    ],
  },
  {
    id: 8,
    to: '/drafts',
    name: 'drafts',
    display: [
      {
        hide: false,
      },
      {
        show: true,
      },
    ],
  },
];

interface InitProp {
  labelSystem: ValueLabelTable[];
  isShowCategory: boolean;
  isShowMore: boolean;
  searchTerm: string;
}

const initialState: InitProp = {
  labelSystem: systemLabels,
  isShowCategory: false,
  isShowMore: true,
  searchTerm: '',
};

export const labelSlice = createSlice({
  name: 'label',
  initialState,
  reducers: {
    updateLabelSystemDisplay: (state, action: PayloadAction<ValueLabelTable[]>) => {
      state.labelSystem = action.payload;
    },
    addSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

const { actions, reducer: labelReducer } = labelSlice;

export const { updateLabelSystemDisplay, addSearchTerm } = actions;

export default labelReducer;
