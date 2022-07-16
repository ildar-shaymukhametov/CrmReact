/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Component } from "react";
import { Outlet } from "react-router-dom";
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
        <main css={{ gridArea: "main", padding: "1rem 2rem" }}>
          <Outlet />
        </main>
      </div>
    );
  }
}
