// Create a slice file (e.g., buttonSlice.js)
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  buttonText: null
};

const buttonSlice = createSlice({
  name: 'button',
  initialState,
  reducers: {
    setButtonText: (state, action) => {
      state.buttonText = action.payload;
    },
  },
});

export const { setButtonText } = buttonSlice.actions;
export default buttonSlice.reducer;
