import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MailType } from '../Types/commonTypes';

export const mailSlice = createSlice({
  name: 'mail',
  initialState: { mail: [] as unknown },
  reducers: {
    setMail: (state, action: PayloadAction<MailType[] | null>) => {
      state.mail = action.payload ? [...action.payload] : null;
    },
  },
});

const { actions, reducer: mailReducer } = mailSlice;

export const { setMail } = actions;

export default mailReducer;
