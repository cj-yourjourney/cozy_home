import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    // Dispatch the logout action
    dispatch(logout());
  };

  return (
    <header>
      <Container className="py-3">
        <Nav>
          <Nav.Item>
            <LinkContainer to="/">
              <Nav.Link>Cozy Homes</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            {!userInfo ? (
              <LinkContainer to="/login/">
                <Nav.Link>
                  <i className="fa-solid fa-user"></i> Login
                </Nav.Link>
              </LinkContainer>
            ) : (
              <NavDropdown
                title={`Welcome, ${userInfo.username}`}
                id="username-dropdown"
              >
                {/* Additional dropdown items can be added here */}
                <LinkContainer to="/profile/">
                  <NavDropdown.Item>User Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to="/cart/">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i> Cart
              </Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Nav>
      </Container>
    </header>
  );
}

export default Header;
