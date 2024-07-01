
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedButton: null,
};

const helloSlice = createSlice({
  name: 'touch',
  initialState,
  reducers: {
    selectButton(state, action) {
      state.selectedButton = action.payload;
    },
  },
});

export const { selectButton } = helloSlice.actions;

export default helloSlice.reducer;
