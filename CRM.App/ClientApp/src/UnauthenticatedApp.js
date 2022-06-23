import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ApplicationPaths } from "./components/api-authorization/ApiAuthorizationConstants";
export { UnauthenticatedApp };

function UnauthenticatedApp() {
  return (
    <NavLink tag={Link} className="text-dark" to={`${ApplicationPaths.Login}`}>
      Login
    </NavLink>
  );
}
