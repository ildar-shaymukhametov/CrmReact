import React from "react";
import { LoginActions } from "./components/api-authorization/ApiAuthorizationConstants";
import { Login } from "./components/api-authorization/Login";
import UnauthenticatedAppAuthorizationRoutes from "./components/api-authorization/UnauthenticatedAppAuthorizationRoutes";

export { UnauthenticatedApp };

function UnauthenticatedApp() {
  return (
    <>
      <UnauthenticatedAppAuthorizationRoutes />
      <Login action={LoginActions.Login}></Login>
    </>
  );
}
