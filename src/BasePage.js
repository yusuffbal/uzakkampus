import React, {Suspense} from "react";
import {Redirect, Route, Switch} from "react-router-dom";

import HomePage from "./app/pages/HomePage";


export default function BasePage() {
    return (
        <Suspense>
        <Switch>
            {
                <Redirect exact from="/" to="/homepage" />
            }
            <Route path="/homepage" component={HomePage} />
        </Switch>
    </Suspense>
    );
}
