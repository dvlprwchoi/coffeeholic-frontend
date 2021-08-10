import React from 'react';
import { Navbar, Container, Nav, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import coffeeMug from '../../img/hot-cup.png';

const Navigation = ({ loggedIn, _handleLogOut, userInfo }) => {
  return (
    <Navbar bg="light" expand="lg" collapseOnSelect={true}>
      <Container>
        <Image src={coffeeMug} width="3%" height="3%" />
        <LinkContainer to="/">
          <Navbar.Brand>COFFEEHOLIC</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/coffeeholic">
              <Nav.Link>Coffee Shops</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {userInfo && (
              <Navbar.Text className="justify-content-end">
                You are signed in as: {userInfo.username}
              </Navbar.Text>
            )}
            {/* If logged in, show Log Out button or if logged out, show Sign Up and Log In buttons */}
            {loggedIn ? (
              <>
                <LinkContainer to="/">
                  <Nav.Link onClick={_handleLogOut}>Log Out</Nav.Link>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer to="/signup">
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Log In</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
