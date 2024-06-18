import React, { useEffect } from "react";
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useDispatch } from "react-redux";
import * as actions from "../../redux/status/statusActions";
import { useHistory } from "react-router-dom";
import { logout } from "../../redux/auth/authSlice";

// 0 : Default, 1 : Success, 2 : Error, 3 : Warning, 4 : Info
const alertTypes = ["default", "success", "error", "warning", "info","error"];

function Alerts({ alerts }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();

    const logouts = (type) => {
        if (type === 5) {
            dispatch(logout()); // Redux'taki logout eylemini tetikle
        }
    }

    useEffect(() => {
        alerts.forEach(({ message, type, key }) => {
            enqueueSnackbar(message, {
                key,
                variant: alertTypes[type],
                preventDuplicate: true,
                disableWindowBlurListener: true,
                autoHideDuration: 4000,
                onExited: () => {
                    dispatch(actions.removeNotification(key));
                    logouts(type);
                }
            });
        });
    }, [alerts, enqueueSnackbar, dispatch]);

    return (
        <div></div>
    );
}

export function AlertManager({ alerts }) {
    return (
        <SnackbarProvider
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            maxSnack={4}
        >
            <Alerts alerts={alerts} />
        </SnackbarProvider>
    );
}