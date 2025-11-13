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
import { useNavigate, useLocation } from "react-router-dom";
import { FaCreditCard, FaLock, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { useAppContext } from "../App.jsx";
import { Link } from "react-router-dom";
import "../styles.css";
 import axios from "axios";

const USD_TO_INR = 83.5;

const Checkout = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { cart, user, addOrder, loadingUser } = useAppContext();
  const navigate = useNavigate();
  const { state } = useLocation();
  const singleProduct = state?.product;

  

  const [billingInfo, setBillingInfo] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passedQuantity =
    state?.quantity && state.quantity > 0 ? state.quantity : 1;

  const items = singleProduct
    ? [{ ...singleProduct, quantity: passedQuantity }]
    : cart.map((item) => ({
        ...item.productId,
        quantity: item.quantity || 1,
      }));


  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;


  useEffect(() => {
    if (!loadingUser && !user) {
      // Save current path for after login
      localStorage.setItem("redirectAfterLogin", "/checkout");
      navigate("/login");
    }
  }, [loadingUser, user, navigate]);

  if (loadingUser) {
    return <p>Loading...</p>; // or a spinner
  }

  if (!user) {
    return null; // no redirect until above useEffect runs
  }
  
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

     await new Promise((resolve) => setTimeout(resolve, 2000));

     // If single product from Buy Now
     if (singleProduct) {
       await axios.post(
         "http://localhost:5000/api/checkout/initiate",
         {
           productId: singleProduct._id,
           quantity: passedQuantity,
           billingInfo, // ✅ send delivery info
         },
         {
           headers: { Authorization: `Bearer ${user.token}` },
         }
       );
     }
     // If from cart (loop through cart items)
     else {
       for (const item of cart) {
         await axios.post(
           "http://localhost:5000/api/checkout/initiate",
           {
             productId: item.productId._id,
             quantity: item.quantity,
             billingInfo, // ✅ send delivery info
           },
           {
             headers: { Authorization: `Bearer ${user.token}` },
           }
         );
       }
     }

     navigate("/my-orders");
   } catch (err) {
     setError(
       err.response?.data?.message ||
         err.message ||
         "Order processing failed. Please try again."
     );
   } finally {
     setLoading(false);
   }
 };


  if (!user) {
    navigate("/login");
    return null;
  }

  if (!singleProduct && cart.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <Container className="my-contner py-4">
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
          <Col lg={8}>
           
            {/* Shipping Information */}
            <Card className="mb-4">
              <Card.Header className="d-flex align-items-center">
                <FaMapMarkerAlt className="me-2 text-primary" />
                <h5 className="mb-0">Shipping Information</h5>
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
                        pattern="^[A-Za-z]+$"
                        title="First name should contain only letters"
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
                        pattern="^[A-Za-z]+$"
                        title="Last name should contain only letters"
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
                      <Form.Label>Phone Number *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={billingInfo.phone}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, "");
                          if (val.length > 10) val = val.slice(0, 10);
                          setBillingInfo({ ...billingInfo, phone: val });
                        }}
                        placeholder="10-digit mobile number"
                        pattern="^\d{10}$"
                        title="Phone number must be exactly 10 digits"
                        required
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
                    onChange={(e) =>
                      setBillingInfo({
                        ...billingInfo,
                        address: e.target.value.trimStart(),
                      })
                    }
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
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, "");
                          if (val.length > 6) val = val.slice(0, 6);
                          setBillingInfo({ ...billingInfo, zipCode: val });
                        }}
                        placeholder="6-digit PIN code"
                        pattern="^\d{6}$"
                        title="ZIP code must be exactly 6 digits"
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Payment Information */}
            <Card className="mb-4">
              <Card.Header className="d-flex align-items-center">
                <FaCreditCard className="me-2 text-primary" />
                <h5 className="mb-0">Payment Information</h5>
              </Card.Header>
              <Card.Body>
                {/* Name on Card */}
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

                {/* Card Number */}
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
                      onChange={(e) => {
                        let val = e.target.value.replace(/\D/g, ""); // Only digits
                        val = val.substring(0, 16); // Max 16 digits
                        val = val.replace(/(.{4})/g, "$1 ").trim(); // Add space every 4 digits
                        setPaymentInfo({ ...paymentInfo, cardNumber: val });
                      }}
                      placeholder="1234 5678 9012 3456"
                      required
                    />
                  </div>
                  <small className="text-muted">
                    We accept Visa, MasterCard, RuPay
                  </small>
                </Form.Group>

                <Row>
                  {/* Expiry Date */}
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Expiry Date *</Form.Label>
                      <Form.Control
                        type="text"
                        name="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\D/g, ""); // Only digits
                          if (val.length >= 3)
                            val = val.slice(0, 2) + "/" + val.slice(2);
                          setPaymentInfo({
                            ...paymentInfo,
                            expiryDate: val.substring(0, 5),
                          });
                        }}
                        placeholder="MM/YY"
                        required
                      />
                    </Form.Group>
                  </Col>

                  {/* CVV */}
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>CVV *</Form.Label>
                      <div className="input-group">
                        <Form.Control
                          type="text"
                          name="cvv"
                          value={paymentInfo.cvv}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, ""); // Only digits
                            setPaymentInfo({
                              ...paymentInfo,
                              cvv: val.substring(0, 4),
                            });
                          }}
                          placeholder="123"
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
              <Card.Header className="text-dark fw-semibold">
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                <div className="mb-3">
                  {items.map((item) => (
                    <div key={item.id} className="order-item-container">
                      <div className="d-flex justify-content-between">
                        <div className="flex-grow-1">
                          <div className="fw-semibold text-light small">
                            {item.name}
                          </div>
                          <div className="text-muted small">
                            Qty: {item.quantity}
                          </div>
                          <Link
                            to={`/product/${item._id}`}
                            className="order-item-link"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {" "}
                            View Details →
                          </Link>
                        </div>
                        <div className="text-end fw-bold">
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 0,
                          }).format(item.price * item.quantity * USD_TO_INR)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <hr />
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
                      new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }).format(shipping * USD_TO_INR)
                    )}
                  </span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total:</strong>
                  <strong className="price-tag">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(total * USD_TO_INR)}
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
