import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { useAppContext } from "../App.jsx";
import { motion, AnimatePresence } from "framer-motion";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  const { login } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setRedirecting(false);

    try {
      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.email ||
        !formData.password
      ) {
        throw new Error("Please fill in all required fields");
      }

      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      const isAdminEmail = formData.email === "admin@techbasket.com";

      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          isAdmin: isAdminEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess("Registration successful!");
      setRedirecting(true);

      let countdown = 4;
      const interval = setInterval(() => {
        setSuccess(`Redirecting to the Login Page in ${countdown} seconds...`);
        countdown--;

        if (countdown < 0) {
          clearInterval(interval);
          navigate("/login");
        }
      }, 1000);
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Registration failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-contner py-5" style={{ minHeight: "100vh" }}>
      <Row
        className="justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Col md={8} lg={6}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card
              className="shadow-lg border-0 login-card"
              style={{ borderRadius: "1rem" }}
            >
              <Card.Body className="p-5">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-4"
                >
                  <h2 className="fw-bold">Create Account</h2>
                  <p className="text-muted mb-0">
                    Join <strong>TechBasket</strong> today
                  </p>
                </motion.div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Alert variant="danger" className="mb-3">
                        {error}
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {redirecting && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Alert
                        variant="success"
                        className="mb-3 d-flex align-items-center justify-content-center text-center"
                        style={{ fontSize: "1rem", gap: "10px" }}
                      >
                        <div
                          className="spinner-border text-success"
                          role="status"
                          style={{ width: "1rem", height: "1rem" }}
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <span className="ms-2">
                          {success || "Please wait..."}
                        </span>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!redirecting && success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Alert variant="success" className="mb-3 text-center">
                      {success}
                    </Alert>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold form-label">
                            First Name
                          </Form.Label>
                          <div className="input-group custom-input">
                            <span className="input-group-text bg-light custom-input-text">
                              <FaUser />
                            </span>
                            <Form.Control
                              size="sm"
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              placeholder="First name"
                              required
                            />
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold form-label">
                            Last Name
                          </Form.Label>
                          <div className="input-group custom-input">
                            <span className="input-group-text bg-light custom-input-text">
                              <FaUser />
                            </span>
                            <Form.Control
                              size="sm"
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleChange}
                              placeholder="Last name"
                              required
                            />
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold form-label">
                        Email Address
                      </Form.Label>
                      <div className="input-group custom-input">
                        <span className="input-group-text bg-light custom-input-text">
                          <FaEnvelope />
                        </span>
                        <Form.Control
                          size="sm"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-semibold form-label">
                        Phone Number
                      </Form.Label>
                      <div className="input-group custom-input">
                        <span className="input-group-text bg-light custom-input-text">
                          <FaPhone />
                        </span>
                        <Form.Control
                          size="sm"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold form-label">
                            Password
                          </Form.Label>
                          <div className="input-group custom-input">
                            <span className="input-group-text bg-light custom-input-text">
                              <FaLock />
                            </span>
                            <Form.Control
                              size="sm"
                              type="password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              placeholder="Create password"
                              required
                            />
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-semibold form-label">
                            Confirm Password
                          </Form.Label>
                          <div className="input-group custom-input">
                            <span className="input-group-text bg-light custom-input-text">
                              <FaLock />
                            </span>
                            <Form.Control
                              size="sm"
                              type="password"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                              placeholder="Confirm password"
                              required
                            />
                          </div>
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="mb-3">
                      <Form.Check
                        type="checkbox"
                        label={
                          <>
                            I agree to the{" "}
                            <Link
                              to="/terms"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary"
                            >
                              Terms and Conditions
                            </Link>
                          </>
                        }
                        required
                      />
                    </div>

                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 mb-3 fw-bold py-2 btn-primary"
                      disabled={loading}
                      style={{ borderRadius: "30px", fontSize: "1rem" }}
                    >
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </Form>
                </motion.div>
              </Card.Body>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Card.Footer
                  className="text-center py-3 card-footer"
                  style={{ borderRadius: "0 0 1rem 1rem" }}
                >
                  <span className="text-muted">Already have an account? </span>
                  <Link
                    to="/login"
                    className="fw-semibold text-decoration-none text-primary"
                  >
                    Sign In
                  </Link>
                </Card.Footer>
              </motion.div>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
