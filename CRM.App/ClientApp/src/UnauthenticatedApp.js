import React from "react";
import { LoginActions } from "./components/api-authorization/ApiAuthorizationConstants";
import { Login } from "./components/api-authorization/Login";

export { UnauthenticatedApp };

function UnauthenticatedApp() {
  return <Login action={LoginActions.Login}></Login>;
}
