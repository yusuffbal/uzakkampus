import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
};
export const callTypes = {
    list: "list",
    action: "action",
};

export const  authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        currentUserFetched(state, action) {
            state.currentUser = action.payload.currentUser;
        },
    },
});


