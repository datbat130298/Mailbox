import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BiSend } from 'react-icons/bi';
import { BsChatLeftText, BsMailbox, BsPersonLinesFill } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import {
  MdLabelImportantOutline,
  MdOutlineContactMail,
  MdOutlineDiscount,
  MdOutlineDrafts,
  MdOutlineStarBorder,
  MdOutlineSystemUpdateAlt,
  MdOutlineWatchLater,
} from 'react-icons/md';
import { RiSpam2Line } from 'react-icons/ri';
import { TbMail } from 'react-icons/tb';
import { ValueLabelTable } from '../../features/Common/WorkSpace/Settings/LabelTable';

const categoryLabel = [
  {
    id: 1,
    to: '/forums',
    name: 'forums',
    icon: <MdOutlineContactMail size={18} />,
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
    icon: <BsPersonLinesFill size={18} />,
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
    icon: <MdOutlineSystemUpdateAlt size={18} />,
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
    icon: <MdOutlineDiscount size={18} />,
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
    icon: <TbMail size={20} />,
    quantity: 132,
    display: [],
  },
  {
    id: 2,
    to: '/starred',
    name: 'starred',
    icon: <MdOutlineStarBorder size={22} />,
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
    to: '/snoozed',
    name: 'snoozed',
    icon: <MdOutlineWatchLater size={20} />,
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
    to: '/important',
    name: 'important',
    icon: <MdLabelImportantOutline size={20} />,
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
    id: 5,
    to: '/chats',
    name: 'chats',
    icon: <BsChatLeftText size={16} />,
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
    icon: <BiSend size={21} className="rotate-45" />,
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
    icon: <RiSpam2Line size={18} />,
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
    icon: <FiTrash2 size={16} />,
    quantity: 13,
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
    id: 9,
    to: '/all_mail',
    name: 'all_mail',
    icon: <BsMailbox size={18} />,
    display: [
      {
        hide: true,
      },
      {
        show: false,
      },
      {
        showIfUnread: false,
      },
    ],
  },
  {
    id: 10,
    to: '/drafts',
    name: 'drafts',
    icon: <MdOutlineDrafts size={20} />,
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
export interface SearchTermType {
  key: string;
  value: string;
}

interface InitProp {
  labelSystem: ValueLabelTable[];
  categoryLabel: ValueLabelTable[];
  isShowCategory: boolean;
  isShowMore: boolean;
  searchTerm: SearchTermType | null;
}

const initialState: InitProp = {
  labelSystem: systemLabels,
  categoryLabel,
  isShowCategory: false,
  isShowMore: true,
  searchTerm: null,
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
    addSearchTerm: (state, action: PayloadAction<SearchTermType>) => {
      state.searchTerm = action.payload;
    },
  },
});

const { actions, reducer: labelReducer } = labelSlice;

export const { updateLabelSystemDisplay, updateCategoryLabelDisplay, addSearchTerm } = actions;

export default labelReducer;
