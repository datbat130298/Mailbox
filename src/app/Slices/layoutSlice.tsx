import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isShowSubSideBar: false,
  itemMailStyle: 'grid',
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setIsShowSubSidebar: (state, action: PayloadAction<boolean>) => {
      state.isShowSubSideBar = action.payload;
    },
    setMailItemStyle: (state, action: PayloadAction<string>) => {
      state.itemMailStyle = action.payload;
    },
  },
});

const { actions, reducer: layoutReducer } = layoutSlice;

export const { setIsShowSubSidebar, setMailItemStyle } = actions;

export default layoutReducer;
