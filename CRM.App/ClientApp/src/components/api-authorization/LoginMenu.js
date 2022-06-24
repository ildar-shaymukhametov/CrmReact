import React from "react";
import { NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { ApplicationPaths } from "./ApiAuthorizationConstants";
import { useAuth } from "../../context/AuthContext";

export { LoginMenu };

function LoginMenu() {
  const profilePath = `${ApplicationPaths.Profile}`;
  const logoutPath = {
    pathname: `${ApplicationPaths.LogOut}`,
    state: { local: true },
  };
  const { user } = useAuth();

  return (
    <>
      <NavItem>
        <NavLink tag={Link} className="text-dark" to={profilePath}>
          Hello {user.name}
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} className="text-dark" to={logoutPath}>
          Logout
        </NavLink>
      </NavItem>
    </>
  );
}
