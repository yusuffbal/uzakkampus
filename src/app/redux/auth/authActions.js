// src/features/auth/authActions.js
import * as requestFromServer from "./authCrud";
import { authSlice } from "./authSlice";
import {callTypes, statusSlice} from "../status/statusSlice";

const { actions } = authSlice;

export const CreateToken = values => dispatch => {
  dispatch(statusSlice.actions.startCall({callType: callTypes.list}));

  return requestFromServer
      .CreateToken(values)
      .then(response => {
          const accessToken = response.data.data.accessToken;
          console.log("values: ", values);
          localStorage.setItem('email', values.email);
          localStorage.setItem('password', values.password);
          dispatch(actions.fetchToken({ accessToken }));
          dispatch(statusSlice.actions.endCall({callType: callTypes.list, message: ''}));
      })
      .catch(error => {
          dispatch(statusSlice.actions.errorCreated({ error }));
      });
};


export const getCurrentUser = values => (dispatch, getState) => {
    const { accessToken } = getState().auth; 
  dispatch(statusSlice.actions.startCall({callType: callTypes.list}));
    return requestFromServer
      .getCurrentUser(values, accessToken) 
      .then(response => {
          const currentUser = response.data.data;
          dispatch(actions.currentUserFetched({ currentUser }));
          dispatch(statusSlice.actions.endCall({callType: callTypes.list, message: ''}));
      })
      .catch(error => {
          dispatch(statusSlice.actions.errorCreated({ error }));
      });
};