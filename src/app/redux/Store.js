// src/app/redux/Store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../redux/auth/authSlice';
import { statusSlice } from './status/statusSlice';
import { dashboardSlice } from './dashboard/dashboardSlice';
import { courseSlice } from './course/courseSlice';
import { forumSlice } from './forum/forumSlice';
import { examSlice } from './exam/examSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    status: statusSlice.reducer,
    auth: persistedReducer,
    dashboard: dashboardSlice.reducer,
    course: courseSlice.reducer,
    forum: forumSlice.reducer,
    exam: examSlice.reducer


  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
