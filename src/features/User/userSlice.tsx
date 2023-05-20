import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  cart: [],
  links: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (!action.payload) {
        state.user = null;
        return;
      }

      state.user = {
        ...action.payload,
      };
    },
  },
});

const { actions, reducer } = userSlice;
export const { setUser } = actions;
export default reducer;
