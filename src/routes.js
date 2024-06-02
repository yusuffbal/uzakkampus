import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import BasePage from "./BasePage";
import LoginPage from "./app/pages/LoginPage";
import Layout from "./app/layout/Layout";

export function AppRoutes() {


  const isAuthorized = localStorage.getItem("accessToken") != null

  return (
    <Switch>
      <Route path="/auth/login" component={LoginPage} />
      <Route path="/">
        {isAuthorized ? (
          <Layout>
            <BasePage />
          </Layout>
        ) : (
          <Redirect to="/auth/login" />
        )}
      </Route>
    </Switch>
  );
}
