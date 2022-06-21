/** @jsx jsx */
import { jsx } from "@emotion/react";
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
          <NavLink disabled href="#">
            Disabled Link
          </NavLink>
        </NavItem>
      </Nav>
    </aside>
  );
}
