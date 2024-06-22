import { forumSlice } from "./forumSlice";
import * as requestFromServer from "./forumCrud";
import { callTypes, statusSlice } from "../status/statusSlice";

const { actions } = forumSlice;



export const ForumByUserIdFetch = id => (dispatch) => {
    dispatch(statusSlice.actions.startCall({ callType: callTypes.list }));
    return requestFromServer
      .ForumByUserId(id)
      .then(response => {
        const entities = response.data.data;
        dispatch(actions.ForumByUserIdFetched({ entities }));
        dispatch(statusSlice.actions.endCall({ callType: callTypes.list, message: '' }));
      })
      .catch(error => {
        dispatch(statusSlice.actions.errorCreated({ error }));
      });
};

export const ForumById = id => (dispatch) => {
    dispatch(statusSlice.actions.startCall({ callType: callTypes.list }));
    return requestFromServer
      .ForumById(id)
      .then(response => {
        const entities = response.data.data;
        dispatch(actions.ForumByIdFetched({ entities }));
        dispatch(statusSlice.actions.endCall({ callType: callTypes.list, message: '' }));
      })
      .catch(error => {
        dispatch(statusSlice.actions.errorCreated({ error }));
      });
};

export const CreatePost = postDetail => dispatch => {

    dispatch(statusSlice.actions.startCall({callType: callTypes.action}));
    return requestFromServer
        .CreatePost(postDetail)
        .then((response) => {

            dispatch(actions.PostCreated({response}));
            dispatch(statusSlice.actions.endCall({callType: callTypes.action, message: 'OK'}));
        })
        .catch(error => {

            dispatch(statusSlice.actions.errorCreated({error}));
        });
};

export const CreateForum = forumDetail => dispatch => {

  dispatch(statusSlice.actions.startCall({callType: callTypes.action}));
  return requestFromServer
      .CreateForum(forumDetail)
      .then((response) => {
          dispatch(statusSlice.actions.endCall({callType: callTypes.action, message: 'OK'}));
      })
      .catch(error => {

          dispatch(statusSlice.actions.errorCreated({error}));
      });
};