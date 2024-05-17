import * as requestFromServer from "./authCrud";
import {  authSlice } from "./authSlice";
const { actions } = authSlice;

export const getCurrentUser = values => dispatch => {
    return requestFromServer
        .getCurrentUser(values)
        .then(response => {
            const currentUser = response.data.data;
            dispatch(actions.currentUserFetched({ currentUser }));
        })
        .catch(error => {
            throw error;
        });
};
