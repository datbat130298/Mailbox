import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SignatureType {
  id: string;
  label: string;
  value: string;
}

const signatureData: SignatureType[] = [];

const initialState = {
  signatureData,
  signatureSelect: {
    id: '1',
    value: '',
    label: 'No signature',
  },
};

export const signatureSlice = createSlice({
  name: 'slice',
  initialState,
  reducers: {
    setSelectSignature: (state, action: PayloadAction<SignatureType>) => {
      Object.assign(state.signatureSelect, action.payload);
    },
    editSignature: (state, action: PayloadAction<SignatureType>) => {
      let arr = [];
      arr = state.signatureData.map((item) => {
        if (item.id === action.payload.id) {
          return Object.assign(state.signatureSelect, action.payload);
        }
        return item;
      });
      state.signatureData = arr;
    },
    addSignature: (state, action: PayloadAction<SignatureType>) => {
      state.signatureData.push(action.payload);
    },
  },
});

const { actions, reducer: signatureReducer } = signatureSlice;

export const { setSelectSignature, addSignature, editSignature } = actions;

export default signatureReducer;
