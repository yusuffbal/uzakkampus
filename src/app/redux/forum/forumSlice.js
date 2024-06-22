import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    entities: [],
    forumDetail: []
};


export const forumSlice = createSlice({
    name: 'course',
    initialState,
    reducers: {
        ForumByUserIdFetched(state, action) {
            state.entities = action.payload.entities;
        },
        ForumByIdFetched(state, action) {
            state.forumDetail = action.payload.entities
        },
        PostCreated: (state, action) => {
            state.forumDetail = action.payload.entities
        },
    },
});

