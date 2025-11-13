import axios from "axios";
import React, { useEffect } from "react";
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
import { useAppContext } from "../App.jsx";
import { useState } from "react";



const USD_TO_INR = 83.5;

const Cart = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    updateCartFromServer,
    user,
  } = useAppContext();

 const cartItemCount = cart.length;
  const navigate = useNavigate();
  const [checkingOut, setCheckingOut] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchCart = async () => {
      if (!user || !user.token) return;

      try {
        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        updateCartFromServer(res.data);
        console.log("✅ Cart fetched:", res.data);
      } catch (error) {
        console.error("❌ Failed to fetch cart:", error);
      }
    };

    fetchCart();
  }, [user]);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      await axios.put(
        `http://localhost:5000/api/cart/${productId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      updateCartFromServer(res.data);

      console.log(
        `✅ Quantity updated and cart refreshed for productId ${productId}:`,
        newQuantity
      );
    } catch (error) {
      console.error("❌ Failed to update quantity:", error);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      // ✅ Re-fetch updated cart from server
      const res = await axios.get("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      updateCartFromServer(res.data);

      console.log(`✅ Item removed and cart refreshed: productId ${productId}`);
    } catch (error) {
      console.error("❌ Failed to remove item:", error);
    }
  };

  const handleCheckout = () => {
    if (!user) {
      localStorage.setItem("redirectAfterLogin", "/checkout");
      navigate("/login");
      return;
    }

    setCheckingOut(true);
    let timeLeft = 3;

    const countdownInterval = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);

      if (timeLeft === 0) {
        clearInterval(countdownInterval);
        navigate("/checkout");
      }
    }, 1000);
  };

  const cartItems = Array.isArray(cart) ? cart : [];

  const subtotal = cartItems.reduce((total, item) => {
    const price = item?.productId?.price ?? 0;
    const qty = item?.quantity ?? 0;
    return total + price * qty;
  }, 0);

  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  if (cartItems.length === 0) {
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
          <h1>Shopping Cart ({cartItems.length} items)</h1>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          {cartItems.map((item) => (
            <Card
              key={item.productId._id + item.quantity}
              className="mb-3 shadow-sm border-0 rounded-4"
            >
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={2} className="text-center">
                    <img
                      src={item.productId?.image}
                      alt={item.productId?.name}
                      className="img-fluid rounded"
                      style={{
                        height: "80px",
                        width: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </Col>

                  <Col md={4}>
                    <h6 className="mb-1 fw-semibold">{item.productId?.name}</h6>
                    <p className="text-muted small mb-1">
                      {item.productId?.brand} • {item.productId?.category}
                    </p>
                    {!item.productId?.inStock && (
                      <Alert
                        variant="warning"
                        className="py-1 px-2 mt-1 mb-0 small"
                      >
                        Out of Stock
                      </Alert>
                    )}
                  </Col>

                  <Col md={3}>
                    <div className="d-flex align-items-center justify-content-start">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() =>
                          handleQuantityChange(
                            item.productId._id,
                            item.quantity - 1
                          )
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
                            item.productId._id,
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
                          handleQuantityChange(
                            item.productId._id,
                            item.quantity + 1
                          )
                        }
                      >
                        <FaPlus />
                      </Button>
                    </div>
                  </Col>

                  <Col md={2} className="text-center">
                    <div className="fw-bold text-primary">
                      ₹{" "}
                      {Math.round(
                        (item.productId?.price ?? 0) *
                          item.quantity *
                          USD_TO_INR
                      ).toLocaleString("en-IN")}
                    </div>
                    <div className="small text-muted">
                      ₹{" "}
                      {Math.round(
                        (item.productId?.price ?? 0) * USD_TO_INR
                      ).toLocaleString("en-IN")}{" "}
                      each
                    </div>
                  </Col>

                  <Col md={1} className="text-end">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveItem(item.productId._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>

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
                <span>Subtotal ({cartItems.length} items):</span>
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
                disabled={checkingOut}
              >
                {checkingOut ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    />
                    Redirecting in {countdown}...
                  </>
                ) : user ? (
                  "Proceed to Checkout"
                ) : (
                  "Login to Checkout"
                )}
              </Button>

              <Button
                className="btn-animated-primary w-100"
                as={Link}
                to="/shopping"
              >
                Continue Shopping
              </Button>
            </Card.Body>
          </Card>

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
