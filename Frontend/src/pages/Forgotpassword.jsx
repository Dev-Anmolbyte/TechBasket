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
import { Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    setTimeout(() => {
      if (!email) {
        setError("Please enter your email address.");
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Please enter a valid email address.");
      } else {
        setMessage(
          "A password reset link has been sent to your email address."
        );
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <h2>Forgot Password</h2>
                <p className="text-muted">
                  Enter your registered email to reset your password
                </p>
              </div>

              {error && (
                <Alert variant="danger" className="mb-3">
                  {error}
                </Alert>
              )}

              {message && (
                <Alert variant="success" className="mb-3">
                  {message}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>
                    <Form.Control
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? "Sending Link..." : "Send Reset Link"}
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center py-3">
              <span className="text-muted">Remembered your password? </span>
              <Link to="/login" className="text-decoration-none">
                Sign In
              </Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

//connecting Backed of Forgot password
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setMessage("");
  setLoading(true);

  try {
    const res = await fetch("http://localhost:5173/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Something went wrong");
    }

    setMessage(data.message);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
//code end of backend

export default ForgotPassword;
