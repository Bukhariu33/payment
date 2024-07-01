import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  updatedData: []
};

const updateDataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.updatedData.push(action.payload)
    },
  },
});

export const { addData } = updateDataSlice.actions;
export default updateDataSlice.reducer;
