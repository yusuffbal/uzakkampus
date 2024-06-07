// src/features/status/statusSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
};

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = statusSlice.actions;
export default statusSlice.reducer;
