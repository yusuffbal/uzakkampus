import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: [],
  courseDetails: [],
  getNotStudentCourse: [],
  AllCourse: [],
  Grading: [],

};


export const courseSlice = createSlice({
    name: 'course',
    initialState,
    reducers: { 
      CourseByUserIdFetched(state, action) {
        state.entities = action.payload.entities;
      },
      CourseByIdFetched(state, action)
      {
        state.courseDetails=action.payload.entities
      },
      getNotStudentCourseFetched(state, action) {
        state.getNotStudentCourse = action.payload.entities;
      },
      AllCourseFetched(state, action) {
        state.AllCourse = action.payload.entities;
      }, 
      GetGradingFetched(state, action) {
        state.Grading = action.payload.entities;
      },    
    },
  });
  
