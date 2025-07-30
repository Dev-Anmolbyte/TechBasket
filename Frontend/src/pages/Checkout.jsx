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
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaLock, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useAppContext } from "../App.jsx";

const USD_TO_INR = 83.5;

const Checkout = () => {
  const { cart, user, addOrder } = useAppContext();
  const navigate = useNavigate();

  const [billingInfo, setBillingInfo] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const handleBillingChange = (e) => {
    setBillingInfo({
      ...billingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentChange = (e) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate required fields
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "address",
        "city",
        "state",
        "zipCode",
      ];
      const missingFields = requiredFields.filter(
        (field) => !billingInfo[field]
      );

      if (missingFields.length > 0) {
        throw new Error("Please fill in all required shipping information");
      }

      if (
        !paymentInfo.cardNumber ||
        !paymentInfo.expiryDate ||
        !paymentInfo.cvv ||
        !paymentInfo.nameOnCard
      ) {
        throw new Error("Please fill in all payment information");
      }

      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const orderData = {
        items: cart,
        billingInfo,
        paymentInfo: {
          ...paymentInfo,
          cardNumber: "**** **** **** " + paymentInfo.cardNumber.slice(-4),
        },
        totals: {
          subtotal,
          tax,
          shipping,
          total,
        },
      };

      addOrder(orderData);
      navigate("/orders");
    } catch (err) {
      setError(err.message || "Order processing failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  if (cart.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col>
          <h1>Checkout</h1>
          <p className="text-muted">Complete your order</p>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Row>
          {/* Shipping & Payment */}
          <Col lg={8}>
            {/* Shipping Information */}
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">
                  <FaMapMarkerAlt className="me-2" />
                  Shipping Information
                </h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>First Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstName"
                        value={billingInfo.firstName}
                        onChange={handleBillingChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Last Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastName"
                        value={billingInfo.lastName}
                        onChange={handleBillingChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email Address *</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={billingInfo.email}
                        onChange={handleBillingChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={billingInfo.phone}
                        onChange={handleBillingChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Street Address *</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={billingInfo.address}
                    onChange={handleBillingChange}
                    placeholder="123 Main St"
                    required
                  />
                </Form.Group>

                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>City *</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={billingInfo.city}
                        onChange={handleBillingChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>State *</Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={billingInfo.state}
                        onChange={handleBillingChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ZIP Code *</Form.Label>
                      <Form.Control
                        type="text"
                        name="zipCode"
                        value={billingInfo.zipCode}
                        onChange={handleBillingChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Payment Information */}
            <Card className="mb-4">
              <Card.Header>
                <h5 className="mb-0">
                  <FaCreditCard className="me-2" />
                  Payment Information
                </h5>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Name on Card *</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaUser />
                    </span>
                    <Form.Control
                      type="text"
                      name="nameOnCard"
                      value={paymentInfo.nameOnCard}
                      onChange={handlePaymentChange}
                      required
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Card Number *</Form.Label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaCreditCard />
                    </span>
                    <Form.Control
                      type="text"
                      name="cardNumber"
                      value={paymentInfo.cardNumber}
                      onChange={handlePaymentChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                    />
                  </div>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Expiry Date *</Form.Label>
                      <Form.Control
                        type="text"
                        name="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={handlePaymentChange}
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>CVV *</Form.Label>
                      <div className="input-group">
                        <Form.Control
                          type="text"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={handlePaymentChange}
                          placeholder="123"
                          maxLength="4"
                          required
                        />
                        <span className="input-group-text">
                          <FaLock />
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Alert variant="info" className="mb-0">
                  <FaLock className="me-2" />
                  Your payment information is encrypted and secure
                </Alert>
              </Card.Body>
            </Card>
          </Col>

          {/* Order Summary */}
          <Col lg={4}>
            <Card
              className="cart-summary position-sticky"
              style={{ top: "100px" }}
            >
              <Card.Header>
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                {/* Items */}
                <div className="mb-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between mb-2"
                    >
                      <div className="flex-grow-1">
                        <div className="fw-bold small">{item.name}</div>
                        <div className="text-muted small">
                          Qty: {item.quantity}
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold">
                          <span>
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                              maximumFractionDigits: 0,
                            }).format(item.price * item.quantity * USD_TO_INR)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <hr />

                {/* Totals */}
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(subtotal * USD_TO_INR)}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax:</span>
                  <span>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(tax * USD_TO_INR)}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping:</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-success">FREE</span>
                    ) : (
                      `$ 
 ${new Intl.NumberFormat("en-IN", {
   style: "currency",
   currency: "INR",
   maximumFractionDigits: 0,
 }).format(shipping * USD_TO_INR)}
</span>`
                    )}
                  </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total:</strong>
                  <strong className="price-tag">
                    <span>
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(total * USD_TO_INR)}
                    </span>
                  </strong>
                </div>

                <Button
                  variant="success"
                  size="lg"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Place Order"}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default Checkout;
