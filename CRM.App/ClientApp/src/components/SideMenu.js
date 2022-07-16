/** @jsx jsx */
import { jsx } from "@emotion/react";
import { NavLink as RRNavLink } from "react-router-dom";
import { Nav, NavItem, NavLink as RSNavLink } from "reactstrap";

export { SideMenu };

function SideMenu() {
  return (
    <aside
      className="sticky-top align-self-start p-3"
      css={{ gridArea: "sidebar" }}
    >
      <Nav vertical pills>
        <NavItem>
          <RSNavLink tag={RRNavLink} to="/companies">
            Companies
          </RSNavLink>
        </NavItem>
      </Nav>
    </aside>
  );
}
