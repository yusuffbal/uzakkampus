import {statusSlice} from "./statusSlice";

const {actions} = statusSlice;

export const createError = (error) => dispatch => {
    dispatch(actions.actions.errorCreated({error}));
};

export const removeNotification = (key) => dispatch => {
    dispatch(actions.notificationRemoved({key: key}));
};

export const validationError = (message) => dispatch => {
    dispatch(actions.validationCreated({message}));
};

export const successMessage = (message) => dispatch => {
    dispatch(actions.successMessageCreated({message}));
};
