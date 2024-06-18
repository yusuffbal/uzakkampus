import * as requestFromServer from "./dashboardCrud";
import { dashboardSlice } from "./dashboardSlice";
import { callTypes, statusSlice } from "../status/statusSlice";

const { actions } = dashboardSlice;

export const DashboardAnaliysesFetch = id => (dispatch) => {
    dispatch(statusSlice.actions.startCall({ callType: callTypes.list }));
    return requestFromServer
      .DashboardAnaliyses(id)
      .then(response => {
        const entities = response.data.data;
        dispatch(actions.DashboardAnaliysesFetched({ entities }));
        dispatch(statusSlice.actions.endCall({ callType: callTypes.list, message: '' }));
      })
      .catch(error => {
        dispatch(statusSlice.actions.errorCreated({ error }));
      });
};

export const DashboardProgressTableFetch = id => (dispatch) => {
    dispatch(statusSlice.actions.startCall({ callType: callTypes.list }));
    return requestFromServer
      .DashboardProgressTable(id)
      .then(response => {
        const entities = response.data.data;
        dispatch(actions.DashboardProgressTableFetched({ entities }));
        dispatch(statusSlice.actions.endCall({ callType: callTypes.list, message: '' }));
      })
      .catch(error => {
        dispatch(statusSlice.actions.errorCreated({ error }));
      });
};

