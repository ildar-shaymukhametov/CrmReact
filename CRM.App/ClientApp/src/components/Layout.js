/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Component } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";
import { SideMenu } from "./SideMenu";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div
        css={{
          display: "grid",
          gridTemplateColumns: "1fr 5fr",
          gridTemplateAreas: "'header header' 'sidebar main'",
        }}
      >
        <NavMenu />
        <SideMenu />
        <Container css={{ gridArea: "main" }}>
          <Outlet />
        </Container>
      </div>
    );
  }
}
