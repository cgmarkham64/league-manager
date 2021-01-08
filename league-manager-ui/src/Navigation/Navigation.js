import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import "./Navigation.css";

class Navigation extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Navbar.Brand href="/">League Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-controls"/>
          <Navbar.Collapse id="navbar-controls">
            <Nav className="mr-auto">
              <Nav.Link href="about">About</Nav.Link>
              <Nav.Link href="contact-us">Contact Us</Nav.Link>
            </Nav>
            <Nav>
              <Button className="nav-button" variant="primary" href="players">
                <i className="fa fa-user-circle fa-user-md"/> Players
              </Button>
              <Button className="nav-button" variant="secondary" href="leagues">
                <i className="fa fa-sitemap"/> Leagues
              </Button>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
