import React from "react";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { UnauthenticatedApp } from "./UnauthenticatedApp";
import "./custom.css";
import { useAuth } from "./context/AuthContext";
import ApiAuthorizationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";

export { App };

function App() {
  const { user } = useAuth();
  return (
    <>
      <ApiAuthorizationRoutes />
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </>
  );
}
