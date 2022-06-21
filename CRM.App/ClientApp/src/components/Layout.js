import React, { Component } from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";
import { SideMenu } from "./SideMenu";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 5fr",
          gridTemplateAreas: "'header header' 'sidebar main'",
        }}
      >
        <NavMenu />
        <SideMenu />
        <Container style={{ gridArea: "main" }}>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
