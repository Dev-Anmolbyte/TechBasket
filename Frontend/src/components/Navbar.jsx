import React from "react";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import {
  Navbar as BsNavbar,
  Nav,
  Container,
  Badge,
  Dropdown,
  Button,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaShoppingCart,
  FaUser,
  FaSignOutAlt,
  FaHistory,
  FaCog,
} from "react-icons/fa";
import { useAppContext } from "../App.jsx";
import logo from "../assets/logo/techlogo.png";

const Navbar = () => {
  //scrolling updation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { user, cart, logout } = useAppContext();
  const navigate = useNavigate();

  //cart page count icon updation
  const location = useLocation();
  const isCartPage = location.pathname === "/cart";

  //Logout button updation
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutModal(false);
    navigate("/");
    window.location.reload();
  };

  //scroll
  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartItemCount = cart.length;

  return (
    <BsNavbar
      variant="light"
      expand="lg"
      sticky="top"
      className="custom-navbar"
    >
      <Container>
        <img
          src={logo}
          alt="TechBasket Logo"
          style={{ width: "220px", marginRight: "30px", height: "auto" }}
        />

        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />

        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto nav-links">
            <Nav.Link
              as={Link}
              to="/"
              className="nav-btn"
              onClick={handleLinkClick}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/shopping"
              className="nav-btn"
              onClick={handleLinkClick}
            >
              Shop
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact-us"
              className="nav-btn"
              onClick={handleLinkClick}
            >
              Contact us
            </Nav.Link>
          </Nav>

          <Nav className="d-flex align-items-center gap-3">
            {/* Cart */}
            {user && (
              <Nav className="nav-links">
                <Nav.Link as={Link} to="/my-orders" className="nav-btn">
                  My Orders
                </Nav.Link>
              </Nav>
            )}

            <Nav.Link
              as={Link}
              to="/cart"
              className="cart-btn position-relative me-3"
              onClick={handleLinkClick}
            >
              <FaShoppingCart size={20} className="me-1" />
              <span className="cart-text"></span>
              {cartItemCount > 0 && !isCartPage && (
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
                  variant={user.role === "admin" ? "danger" : "success"}
                  id="dropdown-user"
                  className="d-flex align-items-center px-3 py-1"
                >
                  <FaUser className="me-2" />
                  {user.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Header>
                    <div className="fw-semibold">{user.name}</div>
                    <div className="small text-muted">{user.email}</div>
                    <Badge
                      bg={user.role === "admin" ? "danger" : "success"}
                      className="mt-1"
                    >
                      {user.role === "admin" ? "Administrator" : "Customer"}
                    </Badge>
                  </Dropdown.Header>

                  <Dropdown.Divider />
                  <Dropdown.Item
                    as={Link}
                    to="/orders"
                    className="d-flex align-items-center gap-2"
                  >
                    <FaHistory />
                    <span>Order History</span>
                  </Dropdown.Item>

                  {user.role === "admin" && (
                    <Dropdown.Item
                      as={Link}
                      to="/admin"
                      className="d-flex align-items-center gap-2"
                    >
                      <FaCog />
                      <span>Admin Dashboard</span>
                    </Dropdown.Item>
                  )}

                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => setShowLogoutModal(true)}
                    className="d-flex align-items-center gap-2 text-danger"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
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
        <Modal
          show={showLogoutModal}
          onHide={() => setShowLogoutModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Logout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to logout from <strong>TechBasket</strong>?
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowLogoutModal(false)}
            >
              Cancel
            </Button>
            <Button variant="danger" onClick={handleLogoutConfirm}>
              Yes, Logout
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
