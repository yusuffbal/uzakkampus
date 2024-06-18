import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialStatusState = {
    alerts: [], // 0 : Default, 1 : Success, 2 : Error, 3 : Warning, 4 : Info
    listLoading: false,
    actionsLoading: false
};

export const callTypes = {
    list: "list",
    action: "action"
};

export const statusSlice = createSlice({
    name: "status",
    initialState: initialStatusState,
    reducers: {
        errorCreated: (state, action) => {
            state.listLoading = false;
            state.actionsLoading = false;
            if (action.payload.error.response && action.payload.error.response.status) {
                // eslint-disable-next-line default-case
                switch (+action.payload.error.response.status) {
                    case 400:
                        if (action.payload.error.response.data.message) {
                            state.alerts.push({
                                message: action.payload.error.response.data.message,
                                type: 2,
                                key: uuidv4()
                            });
                        } else {
                            if (!state.alerts.some(alert => alert.type === 2)) {
                                state.alerts.push({
                                    message: "İşleminiz şu an gerçekleştirilememektedir. Lütfen, daha sonra tekrar deneyin",
                                    type: 2,
                                    key: uuidv4()
                                });
                            }
                        }
                        break;
                    case 404:
                        if (!state.alerts.some(alert => alert.type === 2)) {
                            state.alerts.push({
                                message: "İşleminiz şu an gerçekleştirilememektedir. Lütfen, daha sonra tekrar deneyin",
                                type: 2,
                                key: uuidv4()
                            });
                        }
                        break;
                    case 401:
                        if (!state.alerts.some(alert => alert.type === 2)) {
                            state.alerts.push({
                                message: "İşleminiz şu an gerçekleştirilememektedir. Lütfen, daha sonra tekrar deneyin",
                                type: 5,
                                key: uuidv4()
                            });
                        }
                        break;
                    case 403:
                        if (!state.alerts.some(alert => alert.type === 2)) {
                            state.alerts.push({
                                message: "Lütfen erişim bilgilerinizi kontrol ediniz",
                                type: 2,
                                key: uuidv4()
                            })
                        }
                        break;
                    case 500:
                        // PS: If format changes, this part needs to change as well
                        if (!state.alerts.some(alert => alert.type === 3)) {
                            state.alerts.push({
                                message: "İşleminiz şu an gerçekleştirilememektedir. Lütfen, daha sonra tekrar deneyin",
                                type: 3,
                                key: uuidv4()
                            });
                        }
                        break;
                }
            } else {
                if (!state.alerts.some(alert => alert.type === 2)) {
                    state.alerts.push({ message: action.payload.error.message, type: 2, key: uuidv4() })
                }
            }
        },
        validationCreated: (state, action) => {
            state.alerts.push({ message: action.payload.message, type: 3, key: uuidv4() })
        },
        successMessageCreated: (state, action) => {
            state.alerts.push({ message: action.payload.message, type: 1, key: uuidv4() })
        },
        notificationRemoved: (state, action) => {
            state.alerts = state.alerts.filter(el => el.key !== action.payload.key);
        },

        startCall: (state, action) => {
            if (action.payload.callType === callTypes.list) {
                state.listLoading = true;
            } else {
                state.actionsLoading = true;
            }
        },
        endCall: (state, action) => {
            if (action.payload.callType === callTypes.list) {
                state.listLoading = false;
            } else {
                state.actionsLoading = false;
            }

            if (action.payload.message && action.payload.message !== '')
                state.alerts.push({
                    message: action.payload.message,
                    type: 1,
                    key: uuidv4()
                })
        }
    }
});
