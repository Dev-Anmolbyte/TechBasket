import React from "react";

import {
  Navbar as BsNavbar,
  Nav,
  Container,
  Badge,
  Dropdown,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaHistory,
  FaCog,
} from "react-icons/fa";
import { useAppContext } from "../App.jsx";
import logo from "../assets/logo/techlogo.png";

const handleLinkClick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const Navbar = () => {
  const { user, cart, logout } = useAppContext();
  const navigate = useNavigate();

  // const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartItemCount = cart.length;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <BsNavbar
      bg="primary"
      variant="dark"
      expand="lg"
      sticky="top"
      className="custom-navbar"
    >
        <Container>
          <Link to="/">
                <img
                  src={logo}
                  alt="TechBasket Logo"
                  style={{ width: "220px", marginRight: "30px", height: "auto", cursor: "pointer" }}
                />
          </Link>

          <BsNavbar.Toggle aria-controls="basic-navbar-nav" />

          <BsNavbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto nav-links">
              <Nav.Link as={Link} to="/" className="nav-btn">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/shopping" className="nav-btn">
                Shop
              </Nav.Link>
              <Nav.Link as={Link} to="/contactus" className="nav-btn">
                Contact us
              </Nav.Link>
            </Nav>

            <Nav className="d-flex align-items-center gap-3">
              {/* Cart */}
              <Nav.Link
                as={Link}
                to="/cart"
                className="cart-btn position-relative me-3"
                onClick={handleLinkClick}
              >
                <FaShoppingCart size={20} className="me-1" />
                <span className="cart-text"></span>
                {cartItemCount > 0 && (
                  <Badge
                    bg="danger"
                    pill
                    className="position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {cartItemCount}
                  </Badge>
                )}
              </Nav.Link>

              {/* User Menu */}
              {user ? (
                <Dropdown align="end">
                  <Dropdown.Toggle
                    as={Button}
                    variant="outline-light"
                    id="dropdown-user"
                    className="d-flex align-items-center"
                  >
                    <FaUser className="me-2" />
                    {user.name}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Header>
                      <div className="small">{user.email}</div>
                      <Badge
                        bg={user.role === "admin" ? "danger" : "secondary"}
                        className="mt-1"
                      >
                        {user.role === "admin" ? "Administrator" : "Customer"}
                      </Badge>
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    <Dropdown.Item as={Link} to="/orders">
                      <FaHistory className="me-2" />
                      Order History
                    </Dropdown.Item>
                    {user.role === "admin" && (
                      <Dropdown.Item as={Link} to="/admin">
                        <FaCog className="me-2" />
                        Admin Dashboard
                      </Dropdown.Item>
                    )}
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      <FaSignOutAlt className="me-2" />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Nav className="d-flex align-items-center gap-2 mt-2 mt-lg-0">
                  <Button
                    as={Link}
                    to="/login"
                    variant="outline-light"
                    className="login-btn px-3"
                  >
                    Login
                  </Button>
                  <Button
                    as={Link}
                    to="/register"
                    variant="light"
                    className="signup-btn px-3"
                  >
                    Sign Up
                  </Button>
                </Nav>
              )}
            </Nav>
          </BsNavbar.Collapse>
        </Container>
    </BsNavbar>
  );
};

export default Navbar;
