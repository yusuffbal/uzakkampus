import * as requestFromServer from "./authCrud";
import {  authSlice } from "./authSlice";
const { actions } = authSlice;

export const CreateToken = values => dispatch => {
    return requestFromServer
        .CreateToken(values)
        .then(response => {
            const accessToken = response.data.data.accessToken;
            dispatch(actions.fetchToken({ accessToken }));
        })
        .catch(error => {
            throw error;
        });
};
