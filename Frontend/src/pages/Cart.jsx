import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Alert,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import {
  FaTrash,
  FaMinus,
  FaPlus,
  FaShoppingBag,
  FaArrowLeft,
} from "react-icons/fa";
import { useEffect } from "react";
import { useAppContext } from "../App.jsx";

const USD_TO_INR = 83.5;

const Cart = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { cart, updateCartQuantity, removeFromCart, user } = useAppContext();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  const handleQuantityChange = (productId, newQuantity) => {
    updateCartQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    if (!user) {
      localStorage.setItem("redirectAfterLogin", "/checkout");
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  if (cart.length === 0) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center text-center">
          <Col md={6}>
            <FaShoppingBag size={64} className="text-muted mb-4" />
            <h2>Your Cart is Empty</h2>
            <p className="text-muted mb-4">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/shopping">
              <Button variant="primary" size="lg">
                Start Shopping
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="main-cart-container pt-2 pb-4">
      <Row className="mb-3">
        <Col>
          <Button
            variant="outline-primary"
            className="rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 mb-3 shadow-sm border-1"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
            Continue Shopping
          </Button>
          <h1>Shopping Cart ({cart.length} items)</h1>
        </Col>
      </Row>

      <Row>
        {/* Cart Items */}
        <Col lg={8}>
          {cart.map((item) => (
            <Card key={item.id} className="mb-3 shadow-sm border-0 rounded-4">
              <Card.Body>
                <Row className="align-items-center">
                  {/* Product Image */}
                  <Col md={2} className="text-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{
                        height: "80px",
                        width: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </Col>

                  {/* Product Details */}
                  <Col md={4}>
                    <h6 className="mb-1 fw-semibold">{item.name}</h6>
                    <p className="text-muted small mb-1">
                      {item.brand} • {item.category}
                    </p>
                    {!item.inStock && (
                      <Alert
                        variant="warning"
                        className="py-1 px-2 mt-1 mb-0 small"
                      >
                        Out of Stock
                      </Alert>
                    )}
                  </Col>

                  {/* Quantity Controls */}
                  <Col md={3}>
                    <div className="d-flex align-items-center justify-content-start">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus />
                      </Button>
                      <Form.Control
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="mx-2 text-center"
                        style={{ width: "60px" }}
                      />
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                      >
                        <FaPlus />
                      </Button>
                    </div>
                  </Col>

                  {/* Price Display */}
                  <Col md={2} className="text-center">
                    <div className="fw-bold text-primary">
                      ₹{" "}
                      {Math.round(
                        item.price * item.quantity * USD_TO_INR
                      ).toLocaleString("en-IN")}
                    </div>
                    <div className="small text-muted">
                      ₹{" "}
                      {Math.round(item.price * USD_TO_INR).toLocaleString(
                        "en-IN"
                      )}{" "}
                      each
                    </div>
                  </Col>

                  {/* Delete */}
                  <Col md={1} className="text-end">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
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
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({cart.length} items):</span>
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
                    `
  ${new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(shipping * USD_TO_INR)}`
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

              {shipping > 0 && (
                <Alert variant="info" className="py-2 px-3 mb-3 small">
                  Add items worth{" "}
                  <span>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    }).format(5000 - subtotal * USD_TO_INR)}
                  </span>{" "}
                  more for free shipping!
                </Alert>
              )}

              <Button
                className="btn-animated-primary w-100 mb-3"
                size="lg"
                onClick={handleCheckout}
              >
                {user ? "Proceed to Checkout" : "Login to Checkout"}
              </Button>
              <Button
                className="btn-continue-shopping w-100"
                as={Link}
                to="/shopping"
              >
                Continue Shopping
              </Button>
            </Card.Body>
          </Card>

          {/* Security Info */}
          <Card className="mt-3 border-success">
            <Card.Body className="text-center py-3">
              <h6 className="text-success mb-2">Secure Checkout</h6>
              <small className="text-muted">
                Your payment information is encrypted and secure
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
