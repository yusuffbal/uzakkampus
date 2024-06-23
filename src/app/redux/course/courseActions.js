import { courseSlice } from "./courseSlice";
import * as requestFromServer from "./courseCrud";
import { callTypes, statusSlice } from "../status/statusSlice";

const { actions } = courseSlice;



export const CourseByUserIdFetch = id => (dispatch) => {
    dispatch(statusSlice.actions.startCall({ callType: callTypes.list }));
    return requestFromServer
      .CourseByUserId(id)
      .then(response => {
        const entities = response.data.data;
        dispatch(actions.CourseByUserIdFetched({ entities }));
        dispatch(statusSlice.actions.endCall({ callType: callTypes.list, message: '' }));
      })
      .catch(error => {
        dispatch(statusSlice.actions.errorCreated({ error }));
      });
};

export const CourseById = id => (dispatch) => {
    dispatch(statusSlice.actions.startCall({ callType: callTypes.list }));
    return requestFromServer
      .CourseById(id)
      .then(response => {
        const entities = response.data.data;
        dispatch(actions.CourseByIdFetched({ entities }));
        dispatch(statusSlice.actions.endCall({ callType: callTypes.list, message: '' }));
      })
      .catch(error => {
        dispatch(statusSlice.actions.errorCreated({ error }));
      });
};



export const CreateCourse = course => dispatch => {

  dispatch(statusSlice.actions.startCall({callType: callTypes.action}));
  return requestFromServer
      .CreateCourse(course)
      .then((response) => {
          dispatch(statusSlice.actions.endCall({callType: callTypes.action, message: 'OK'}));
      })
      .catch(error => {

          dispatch(statusSlice.actions.errorCreated({error}));
      });
};


export const GetNotStudentCourseFetch = id => (dispatch) => {
  dispatch(statusSlice.actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .GetNotStudentCourse(id)
    .then(response => {
      const entities = response.data.data;
      dispatch(actions.getNotStudentCourseFetched({ entities }));
      dispatch(statusSlice.actions.endCall({ callType: callTypes.list, message: '' }));
    })
    .catch(error => {
      dispatch(statusSlice.actions.errorCreated({ error }));
    });
};

export const GetAllCourseFetch = id => (dispatch) => {
  dispatch(statusSlice.actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .GetAllCourse()
    .then(response => {
      const entities = response.data.data;
      dispatch(actions.AllCourseFetched({ entities }));
      dispatch(statusSlice.actions.endCall({ callType: callTypes.list, message: '' }));
    })
    .catch(error => {
      dispatch(statusSlice.actions.errorCreated({ error }));
    });
};


export const AddStudentsToCourse = ( id, StudentCourse )=> dispatch => {

  dispatch(statusSlice.actions.startCall({callType: callTypes.action}));
  return requestFromServer
      .AddStudentsToCourse(id,StudentCourse)
      .then((response) => {
          dispatch(statusSlice.actions.endCall({callType: callTypes.action, message: 'OK'}));
      })
      .catch(error => {

          dispatch(statusSlice.actions.errorCreated({error}));
      });
};


export const CreateAssigment = assigment => dispatch => {

  dispatch(statusSlice.actions.startCall({callType: callTypes.action}));
  return requestFromServer
      .CreateAssigment(assigment)
      .then((response) => {
          dispatch(statusSlice.actions.endCall({callType: callTypes.action, message: 'OK'}));
      })
      .catch(error => {

          dispatch(statusSlice.actions.errorCreated({error}));
      });
};

export const AddDocument = document => dispatch => {

  dispatch(statusSlice.actions.startCall({callType: callTypes.action}));
  return requestFromServer
      .AddDocument(document)
      .then((response) => {
          dispatch(statusSlice.actions.endCall({callType: callTypes.action, message: 'OK'}));
      })
      .catch(error => {

          dispatch(statusSlice.actions.errorCreated({error}));
      });
};

export const AddVideo = video => dispatch => {

  dispatch(statusSlice.actions.startCall({callType: callTypes.action}));
  return requestFromServer
      .AddVideo(video)
      .then((response) => {
          dispatch(statusSlice.actions.endCall({callType: callTypes.action, message: 'OK'}));
      })
      .catch(error => {

          dispatch(statusSlice.actions.errorCreated({error}));
      });
};