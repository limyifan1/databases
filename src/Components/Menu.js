import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

export class Menu extends React.Component {
  render() {
    return (
      <Navbar
        bg="light"
        variant="light"
        style={{ position: "fixed", width: "100%", zIndex: "9999" }}
      >
        <Navbar.Brand as={Link} to="/" style={{ color: "#B48300" }}>
          Test{" "}
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav.Link
            href="#"
            as={Link}
            to="/"
            id="menu-link"
            style={{ color: "grey" }}
          >
            Home
          </Nav.Link>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Menu;
