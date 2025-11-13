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
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppContext } from "../App.jsx";
import { motion } from "framer-motion";


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirecting, setRedirecting] = useState(false);

  const { login } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPassword = localStorage.getItem("rememberedPassword");

    if (savedEmail && savedPassword) {
      setFormData({ email: savedEmail, password: savedPassword });
      setRememberMe(true);
    }
  }, []);

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
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        { email: formData.email, password: formData.password },
        { headers: { "Content-Type": "application/json" } }
      );

      setSuccess("Login successful! Redirecting in 4 seconds...");
      setRedirecting(true);

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", formData.email);
        localStorage.setItem("rememberedPassword", formData.password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }

      let countdown = 4;
      const countdownInterval = setInterval(() => {
        countdown--;
        setSuccess(`Login successful! Redirecting in ${countdown} seconds...`);

        if (countdown === 0) {
          clearInterval(countdownInterval);
          login({
            id: data._id,
            name: data.name,
            email: data.email,
            role: data.isAdmin ? "admin" : "customer",
            token: data.token,
          });
          navigate(data.redirectPath || "/");
        }
      }, 1000);
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-contner py-5" style={{ minHeight: "100vh" }}>
      <Row
        className="justify-content-center"
        style={{
          minHeight: "100vh",
          alignItems: "flex-start",
          paddingTop: "60px",
        }}
      >
        <Col md={6} lg={4}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card
              className="login-card shadow-lg border-0"
              style={{ borderRadius: "1rem" }}
            >
              <Card.Body className="p-5">
                <motion.div
                  className="text-center mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="fw-bold">Welcome Back</h2>
                  <p className="text-muted mb-0">
                    Sign in to your <strong>TechBasket</strong> account
                  </p>
                </motion.div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Alert variant="danger" className="mb-3">
                      {error}
                    </Alert>
                  </motion.div>
                )}

                {success && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Alert variant="success" className="mb-3">
                      {success}
                    </Alert>
                  </motion.div>
                )}

                {redirecting && (
                  <motion.div
                    className="text-center mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="spinner-border text-success" role="status">
                      <span className="visually-hidden">Redirecting...</span>
                    </div>
                    <div className="text-muted mt-2">Please wait...</div>
                  </motion.div>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">
                      Email Address
                    </Form.Label>
                    <motion.div
                      className="input-group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <span className="input-group-text">
                        <FaUser />
                      </span>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                      />
                    </motion.div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-semibold">Password</Form.Label>
                    <motion.div
                      className="input-group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <span className="input-group-text">
                        <FaLock />
                      </span>
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                      />
                      <span
                        className="input-group-text"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </motion.div>
                  </Form.Group>

                  <motion.div
                    className="mb-3 d-flex justify-content-between align-items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Form.Check
                      type="checkbox"
                      label="Remember me"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <Link to="#" className="small">
                      Forgot Password?
                    </Link>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Button
                      variant="primary"
                      type="submit"
                      className="w-100 mb-3 fw-bold py-2"
                      disabled={loading}
                      style={{ borderRadius: "30px", fontSize: "1rem" }}
                    >
                      {loading ? "Signing In..." : "Sign In"}
                    </Button>
                  </motion.div>
                </Form>
              </Card.Body>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Card.Footer className="text-center py-3">
                  <span className="text-muted">Don't have an account? </span>
                  <Link to="/register" className="fw-semibold">
                    Sign Up
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

export default Login;
