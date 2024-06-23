import { examSlice } from "./examSlice";
import * as requestFromServer from "./examCrud";
import { callTypes, statusSlice } from "../status/statusSlice";

const { actions } = examSlice;




export const GetUserExamFetch = id => (dispatch) => {
    dispatch(statusSlice.actions.startCall({ callType: callTypes.list }));
    return requestFromServer
      .GetUserExam(id)
      .then(response => {
        const entities = response.data.data;
        dispatch(actions.ExamInfoFetched({ entities }));
        dispatch(statusSlice.actions.endCall({ callType: callTypes.list, message: '' }));
      })
      .catch(error => {
        dispatch(statusSlice.actions.errorCreated({ error }));
      });
};

export const ExamQuestionsFetch = id => (dispatch) => {
    dispatch(statusSlice.actions.startCall({ callType: callTypes.list }));
    return requestFromServer
      .QuestionListByExamId(id)
      .then(response => {
        const entities = response.data.data;
        dispatch(actions.examQuestionsFetched({ entities }));
        dispatch(statusSlice.actions.endCall({ callType: callTypes.list, message: '' }));
      })
      .catch(error => {
        dispatch(statusSlice.actions.errorCreated({ error }));
      });
};


export const FinishExam = exam => dispatch => {

    dispatch(statusSlice.actions.startCall({callType: callTypes.action}));
    return requestFromServer
        .FinishExam(exam)
        .then((response) => {
            dispatch(statusSlice.actions.endCall({callType: callTypes.action, message: 'OK'}));
        })
        .catch(error => {
  
            dispatch(statusSlice.actions.errorCreated({error}));
        });
  };

  export const AddExam = exam => dispatch => {

    dispatch(statusSlice.actions.startCall({callType: callTypes.action}));
    return requestFromServer
        .AddExam(exam)
        .then((response) => {
            dispatch(statusSlice.actions.endCall({callType: callTypes.action, message: 'OK'}));
        })
        .catch(error => {
  
            dispatch(statusSlice.actions.errorCreated({error}));
        });
  };

  export const GetAllExamFetch = id => (dispatch) => {
    dispatch(statusSlice.actions.startCall({ callType: callTypes.list }));
    return requestFromServer
      .GetAllExam()
      .then(response => {
        const entities = response.data.data;
        dispatch(actions.GetAllExamFetched({ entities }));
        dispatch(statusSlice.actions.endCall({ callType: callTypes.list, message: '' }));
      })
      .catch(error => {
        dispatch(statusSlice.actions.errorCreated({ error }));
      });
};


export const AddExamQuestion = question => dispatch => {

    dispatch(statusSlice.actions.startCall({callType: callTypes.action}));
    return requestFromServer
        .AddExamQuestions(question)
        .then((response) => {
            dispatch(statusSlice.actions.endCall({callType: callTypes.action, message: 'OK'}));
        })
        .catch(error => {
  
            dispatch(statusSlice.actions.errorCreated({error}));
        });
  };