import React, { useState, useEffect, useRef } from "react";
import {
  Navbar as BsNavbar,
  Nav,
  Container,
  Badge,
  Dropdown,
  Button,
  Modal,
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
import { motion } from "framer-motion";
import { gsap } from "gsap";

const Navbar = () => {
  const { user, cart, logout } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const logo = logoRef.current;

    // Logo entrance animation
    gsap.fromTo(
      logo,
      { y: -10, scale: 0.9, opacity: 0 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      }
    );

    // Logo pulse animation
    gsap.to(logo, {
      y: -6,
      scale: 1.02,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: 2.5,
      delay: 1.5,
    });

    // GSAP glowing animation for navbar buttons

    const ctx = gsap.context(() => {
      const navButtons = document.querySelectorAll(".nav-btn");

      navButtons.forEach((btn) => {
        gsap.set(btn, {
          transition: "all 0.3s ease-in-out",
          borderRadius: "6px",
        });

        btn.addEventListener("mouseenter", () => {
          gsap.to(btn, {
            boxShadow: `0 0 8px var(--color-primary), 0 0 16px var(--color-primary)`,
            backgroundColor: "rgba(13, 110, 253, 0.15)", // electric blue tint
            color: "var(--color-primary)",
            duration: 0.3,
            ease: "power2.out",
          });
        });

        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, {
            boxShadow: "none",
            backgroundColor: "transparent",
            color: "var(--color-text)",
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    });
    

    // Cleanup
    return () => {
      ctx.revert();
    };
  }, []);

  const handleLogoutConfirm = () => {
    logout();
    setShowLogoutModal(false);
    navigate("/");
    window.location.reload();
  };

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isCartPage = location.pathname === "/cart";
  const cartItemCount = Array.isArray(cart) ? cart.length : 0;

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <BsNavbar
        variant="dark"
        expand="lg"
        sticky="top"
        className="custom-navbar shadow-sm"
      >
        <Container>
          <img
            ref={logoRef}
            src={logo}
            alt="TechBasket Logo"
            className="logo-glow"
            style={{
              width: "220px",
           //   marginRight: "5%",
              height: "auto",
              cursor: "pointer",
              marginLeft:"-5%",
             
            }}
          />

          <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
          <BsNavbar.Collapse id="basic-navbar-nav">
            <div className="w-100 d-flex justify-content-between align-items-center flex-wrap position-relative">
              <div className="centered-nav d-flex align-items-center gap-3 nav-links m-lg-auto">
                {["/", "/shopping", "/contact-us"].map((path, i) => (
                  <motion.div
                    key={path}
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Nav.Link
                      as={Link}
                      to={path}
                      className="nav-btn"
                      onClick={handleLinkClick}
                    >
                      {["Home", "Shop", "Contact Us"][i]}
                    </Nav.Link>
                  </motion.div>
                ))}
              </div>

              <Nav className="d-flex align-items-center gap-3 justify-content-center justify-content-lg-start nav-links mt-2 mt-lg-0">
                {user && (
                  <motion.div
                    whileHover={{ scale: 1.07 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Nav.Link as={Link} to="/my-orders" className="nav-btn">
                      My Orders
                    </Nav.Link>
                  </motion.div>
                )}

                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Nav.Link
                    as={Link}
                    to="/cart"
                    className="cart-btn position-relative me-3"
                    onClick={handleLinkClick}
                  >
                    <FaShoppingCart size={20} className="me-1" />
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
                </motion.div>

                {user ? (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
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
                            {user.role === "admin"
                              ? "Administrator"
                              : "Customer"}
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
                  </motion.div>
                ) : (
                  <Nav className="d-flex align-items-center gap-2">
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        as={Link}
                        to="/login"
                        variant="outline-light"
                        className="login-btn px-3"
                      >
                        Login
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        as={Link}
                        to="/register"
                        variant="light"
                        className="signup-btn px-3"
                      >
                        Sign Up
                      </Button>
                    </motion.div>
                  </Nav>
                )}
              </Nav>
            </div>
          </BsNavbar.Collapse>
          {/* Logout Confirmation Modal */}
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
    </motion.div>
  );
};

export default Navbar;
