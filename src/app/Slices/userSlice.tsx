import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { UserDataType } from '../Types/userTypes';

const initialState: UserDataType = {
  sid: '',
  uuid: 0,
  email: '',
  first_name: '',
  last_name: '',
  username: '',
  roles: [],
  token: '',
  name: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserDataType>) => {
      if (!_.isEqual(action.payload, state)) {
        Object.assign(state, action.payload);
      }
    },
    clearUser: (state) => {
      Object.assign(state, initialState);
    },
  },
});

const { actions, reducer: userReducer } = userSlice;

export const { setUser, clearUser } = actions;

export default userReducer;
