/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navBarContainer0">
      <Container className="navBarContainer1">
        <Link passHref href="/">
          <Navbar.Brand>Band-Aid</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Container className="navBarContainer2">
            <Nav className="me-auto navBarContainer3">
              {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
              <Link passHref href="/">
                <Nav.Link>My Bands</Nav.Link>
              </Link>
              <Link passHref href="/">
                <Nav.Link>New Band</Nav.Link>
              </Link>
              <div className="navBarSpacer" />
              <Button variant="outline-light" onClick={signOut}>Sign Out</Button>
            </Nav>
          </Container>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
