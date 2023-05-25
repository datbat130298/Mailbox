import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isShowSubSideBar: false,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setIsShowSubSidebar: (state, action: PayloadAction<boolean>) => {
      state.isShowSubSideBar = action.payload;
    },
  },
});

const { actions, reducer: layoutReducer } = layoutSlice;

export const { setIsShowSubSidebar } = actions;

export default layoutReducer;
