import React from "react";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { UnauthenticatedApp } from "./UnauthenticatedApp";
import "./custom.css";
import { useAuth } from "./context/AuthContext";
import { Route } from "react-router-dom";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";

export { App }

function App() {
  const { user } = useAuth();
  return (
    <>
      <Route
        path={ApplicationPaths.ApiAuthorizationPrefix}
        component={ApiAuthorizationRoutes}
      />
      {user.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </>
  );
}
