// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  accessToken: null,
  currentUser: null,
  teacherList: null,
  studentList: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    currentUserFetched(state, action) {
      state.currentUser = action.payload.currentUser;
    },
    teacherListFetched(state, action) {
      state.teacherList = action.payload.teacherList;
    },
    studentListFetched(state, action) {
      state.studentList = action.payload.studentList;
    },
    fetchToken(state, action) {
      const token = action.payload.accessToken;
      console.log("Storing token in localStorage:", token); // Log token storage
      localStorage.setItem('accessToken', token);
      state.accessToken = token;
      state.isAuth = true;
    },
    logout(state) {
      console.log("Removing token from localStorage"); // Log logout
      localStorage.removeItem('accessToken');
      state.accessToken = null;
      state.isAuth = false;
      state.currentUser = null;
    },
    checkAuth(state) {
      const token = localStorage.getItem('accessToken');
      console.log("Checking token in localStorage:", token); // Log token check
      if (token) {
        state.accessToken = token;
        state.isAuth = true;
      } else {
        state.isAuth = false;
      }
    },
  },
});

export const { currentUserFetched, fetchToken, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
