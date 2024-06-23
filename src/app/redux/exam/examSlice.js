import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    examInfo: [],
    examQuestions: [],
    allExam:[]

};


export const examSlice = createSlice({
    name: 'exam',
    initialState,
    reducers: {
        ExamInfoFetched(state, action) {
            state.examInfo = action.payload.entities;
        },
        examQuestionsFetched(state,action)
        {
            state.examQuestions=action.payload.entities
        },
        GetAllExamFetched(state,action)
        {
            state.allExam=action.payload.entities
        }
    },
});

