// src/app/redux/Store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../redux/auth/authSlice';
import statusReducer from '../redux/status/statusSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    status: statusReducer,
    auth: persistedReducer,
  },
});

export const persistor = persistStore(store);

export default store;
