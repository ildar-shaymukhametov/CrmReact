import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { ApplicationPaths, LoginActions, LogoutActions } from "./ApiAuthorizationConstants";

export default class UnauthenticatedAppAuthorizationRoutes extends Component {
  render() {
    return (
      <Routes>
        <Route path={ApplicationPaths.ApiAuthorizationPrefix}>
          <Route
            path={ApplicationPaths.Login}
            element={<Login action={LoginActions.Login}></Login>}
          />
          <Route
            path={ApplicationPaths.LoginFailed}
            element={<Login action={LoginActions.LoginFailed}></Login>}
          />
          <Route
            path={ApplicationPaths.LoginCallback}
            element={<Login action={LoginActions.LoginCallback}></Login>}
          />
          <Route
            path={ApplicationPaths.Register}
            element={<Login action={LoginActions.Register}></Login>}
          />
          <Route
            path={ApplicationPaths.LogOutCallback}
            element={<Logout action={LogoutActions.LogoutCallback}></Logout>}
          />
          <Route
            path={ApplicationPaths.LoggedOut}
            element={<Logout action={LogoutActions.LoggedOut}></Logout>}
          />
        </Route>
      </Routes>
    );
  }
}
