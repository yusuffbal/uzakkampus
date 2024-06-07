// src/features/auth/authActions.js
import * as requestFromServer from "./authCrud";
import { authSlice } from "./authSlice";
const { actions } = authSlice;

export const CreateToken = values => dispatch => {
  return requestFromServer
    .CreateToken(values)
    .then(response => {
      const accessToken = response.data.data.accessToken;
      console.log("valueess: ",values)
      localStorage.setItem('email', values.email);
      localStorage.setItem('password', values.password);
      dispatch(actions.fetchToken({ accessToken }));
    })
    .catch(error => {
      throw error;
    });
};


export const getCurrentUser = values => (dispatch, getState) => {
    const { accessToken } = getState().auth; 
    return requestFromServer
      .getCurrentUser(values, accessToken) 
      .then(response => {
        const currentUser = response.data.data;
        dispatch(actions.currentUserFetched({ currentUser }));
      })
      .catch(error => {
        throw error;
      });
  };