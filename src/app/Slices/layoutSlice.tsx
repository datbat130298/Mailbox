import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isShowFullSidebar: false,

  itemMailStyle: 'grid',
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setIsShowFullSidebar: (state, action: PayloadAction<boolean>) => {
      state.isShowFullSidebar = action.payload;
    },
    setMailItemStyle: (state, action: PayloadAction<string>) => {
      state.itemMailStyle = action.payload;
    },
  },
});

const { actions, reducer: layoutReducer } = layoutSlice;

export const { setIsShowFullSidebar, setMailItemStyle } = actions;

export default layoutReducer;
