import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import BasePage from "./BasePage";
import LoginPage from "./app/pages/LoginPage";

export function AppRoutes() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [accessToken] = useState(localStorage.getItem("accessToken"));

  useEffect(() => {
    if (accessToken != null) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [accessToken]);

  return (
    <Router>
      <Switch>
        <Route path="/auth/login" component={LoginPage} />
        {!isAuthorized ? (
          <Route path="*" render={() => <LoginPage />} />
        ) : (
          <Redirect from="/auth" to="/" />
        )}
        {!isAuthorized ? (
          <Redirect to="/auth/login" />
        ) : (
          <Route path="/" component={BasePage} />
        )}
      </Switch>
    </Router>
  );
}
