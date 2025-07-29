import React, { useState } from "react";
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
import { FaUser, FaLock } from "react-icons/fa";
import { useAppContext } from "../App.jsx";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAppContext();
  const navigate = useNavigate();

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

    try {
      // Simulate login logic (in real app, this would be an API call)
      if (
        formData.email === "admin@techbasket.com" &&
        formData.password === "admin123"
      ) {
        login({
          id: 1,
          name: "Admin User",
          email: formData.email,
          role: "admin",
        });
      } else if (formData.email && formData.password) {
        login({
          id: 2,
          name: "John Doe",
          email: formData.email,
          role: "customer",
        });
      } else {
        throw new Error("Please fill in all fields");
      }

      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2>Welcome Back</h2>
                <p className="text-muted">Sign in to your TechBasket account</p>
              </div>

              {error && (
                <Alert variant="danger" className="mb-3">
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <div className="input-group">
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
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaLock />
                    </span>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </Form.Group>

                <div className="mb-3">
                  <Form.Check type="checkbox" label="Remember me" />
                </div>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>

                <div className="text-center">
                  <Link to="#" className="text-decoration-none">
                    Forgot Password?
                  </Link>
                </div>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center py-3">
              <span className="text-muted">Don't have an account? </span>
              <Link to="/register" className="text-decoration-none">
                Sign Up
              </Link>
            </Card.Footer>
          </Card>

          {/* Demo credentials info */}
          {/* <Card className="mt-3 border-info">
            <Card.Body className="p-3">
              <h6 className="text-info mb-2">Demo Credentials:</h6>
              <small className="text-muted d-block">
                Admin: admin@techbasket.com / admin123
              </small>
              <small className="text-muted d-block">
                Customer: any email / any password
              </small>
            </Card.Body>
          </Card> */}
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
