import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isShowFullSidebar: false,
  isSidebarOpen: window.localStorage.getItem('isSidebarOpen') === 'true',
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
    toggleSidebar(state) {
      const newStatus = !state.isSidebarOpen;

      window.localStorage.setItem('isSidebarOpen', newStatus.toString());

      state.isSidebarOpen = newStatus;
    },
  },
});

const { actions, reducer: layoutReducer } = layoutSlice;

export const { setIsShowFullSidebar, setMailItemStyle } = actions;

export default layoutReducer;
