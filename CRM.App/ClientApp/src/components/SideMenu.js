/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";

export { SideMenu };

function SideMenu() {
  return (
    <aside
      className="sticky-top align-self-start p-3"
      css={{ gridArea: "sidebar" }}
    >
      <Nav vertical pills>
        <NavItem>
          <NavLink className="active" href="#">
            Link
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Another Link</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/companies">
            Companies
          </NavLink>
        </NavItem>
      </Nav>
    </aside>
  );
}
