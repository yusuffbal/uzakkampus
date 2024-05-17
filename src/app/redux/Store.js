import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { statusSlice } from './status/statusSlice';

const store = configureStore({
  reducer: {
    status: statusSlice.reducer,
    auth: authSlice.reducer
  },
});

export default store;
