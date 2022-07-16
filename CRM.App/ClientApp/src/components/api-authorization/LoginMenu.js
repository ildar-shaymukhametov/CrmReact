import React from "react";
import { NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { ApplicationPaths } from "./ApiAuthorizationConstants";
import { useAuth } from "../../context/AuthContext";

export { LoginMenu };

function LoginMenu() {
  const { user } = useAuth();

  return (
    <>
      <NavItem>
        <NavLink tag={Link} className="text-dark" to={ApplicationPaths.Profile}>
          Hello {user.name}
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          tag={Link}
          className="text-dark"
          to={ApplicationPaths.LogOut}
          state={{ local: true }}
        >
          Logout
        </NavLink>
      </NavItem>
    </>
  );
}
