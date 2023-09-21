import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ValueLabelTable } from '../../features/Common/WorkSpace/Settings/LabelTable';

const categoryLabel = [
  {
    id: 1,
    to: '/forums',
    name: 'forums',
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
    id: 2,
    name: 'social',
    to: '/social',
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
    id: 3,
    to: '/updates',
    name: 'updates',
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
    to: '/promotions',
    name: 'promotions',
    display: [
      {
        hide: false,
      },
      {
        show: true,
      },
      {
        showIfUnread: false,
      },
    ],
  },
];

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
  // {
  //   id: 3,
  //   to: '/snoozed',
  //   name: 'snoozed',
  //   display: [
  //     {
  //       hide: true,
  //     },
  //     {
  //       show: false,
  //     },
  //   ],
  // },
  // {
  //   id: 4,
  //   to: '/important',
  //   name: 'important',
  //   display: [
  //     {
  //       hide: true,
  //     },
  //     {
  //       show: false,
  //     },
  //   ],
  // },
  {
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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

  // {
  //   id: 9,
  //   to: '/all_mail',
  //   name: 'all_mail',
  //   display: [
  //     {
  //       hide: true,
  //     },
  //     {
  //       show: false,
  //     },
  //     {
  //       showIfUnread: false,
  //     },
  //   ],
  // },
  {
    id: 10,
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
  categoryLabel: ValueLabelTable[];
  isShowCategory: boolean;
  isShowMore: boolean;
  searchTerm: string;
}

const initialState: InitProp = {
  labelSystem: systemLabels,
  categoryLabel,
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
    updateCategoryLabelDisplay: (state, action: PayloadAction<ValueLabelTable[]>) => {
      state.categoryLabel = action.payload;
    },
    addSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
  },
});

const { actions, reducer: labelReducer } = labelSlice;

export const { updateLabelSystemDisplay, updateCategoryLabelDisplay, addSearchTerm } = actions;

export default labelReducer;
