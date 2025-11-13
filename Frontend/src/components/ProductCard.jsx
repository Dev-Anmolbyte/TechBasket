import React, { useEffect, useRef, useCallback } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useAppContext } from "../App.jsx";
import axios from "axios";
import gsap from "gsap";

// Global constant for currency conversion
const USD_TO_INR_RATE = 83.5;

const ProductCard = ({ product }) => {
  const { user, isInCart, fetchCartFromBackend } = useAppContext();
  const navigate = useNavigate();
  const cardRef = useRef(null);

  // Memoize event handlers to prevent unnecessary re-renders and potential memory leaks
  const handleAddToCart = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!user?.token) {
        navigate("/login");
        return;
      }

      try {
        await axios.post(
          "http://localhost:5000/api/cart",
          { productId: product._id, quantity: 1 },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );

        // Await the fetch to ensure cart state is updated before proceeding
        await fetchCartFromBackend();
        console.log(`Product "${product.name}" added to cart.`);
      } catch (err) {
        console.error(
          "Failed to add item to cart:",
          err.response?.data || err.message
        );
        // Implement user-friendly feedback here (e.g., a toast notification)
      }
    },
    [user, product, navigate, fetchCartFromBackend]
  );

  const handleBuyNow = useCallback(
    async (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (!user?.token) {
        // Store data in session storage instead of local storage for a cleaner approach
        sessionStorage.setItem("redirectAfterLogin", "/checkout");
        sessionStorage.setItem(
          "checkoutData",
          JSON.stringify({ product, quantity: 1 })
        );
        navigate("/login");
        return;
      }

      try {
        await axios.post(
          "http://localhost:5000/api/checkout/initiate",
          { productId: product._id, quantity: 1 },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );

        navigate("/checkout", { state: { product, quantity: 1 } });
      } catch (err) {
        console.error(
          "Failed to initiate checkout:",
          err.response?.data || err.message
        );
        // Implement user-friendly feedback here
      }
    },
    [user, product, navigate]
  );

  const handleViewDetails = useCallback(() => {
    // Scroll to the top of the page smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Use a single Timeline for better control over animations
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Entry animation
    timeline.fromTo(
      card,
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6 }
    );

    // Hover animation
    const onEnter = () => {
      gsap.to(card, {
        scale: 1.03,
        boxShadow: "0 0 20px rgba(0, 140, 255, 0.25)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const onLeave = () => {
      gsap.to(card, {
        scale: 1,
        boxShadow: "none",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);

    return () => {
      // Clean up event listeners to prevent memory leaks
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []); // Empty dependency array ensures this runs once on mount

  // Render the component with improved structure and styles
  return (
    <Card
      ref={cardRef}
      className="h-100 shadow-sm border-0 rounded-4 overflow-hidden product-card"
    >
      <Link
        to={`/product/${product._id}`}
        onClick={handleViewDetails}
        className="text-decoration-none"
      >
        <div className="bg-light text-center p-2">
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.name}
            style={{
              height: "180px",
              width: "100%",
              objectFit: "cover",
              borderRadius: "0.5rem",
            }}
          />
        </div>
      </Link>
      <Card.Body className="d-flex flex-column px-3 py-3">
        <Link
          to={`/product/${product._id}`}
          onClick={handleViewDetails}
          className="text-decoration-none"
        >
          <Card.Title className="h6 fw-semibold text-white mb-1">
            {product.name}
          </Card.Title>
        </Link>
        <Card.Text className="text-muted small mb-2">
          {product.brand} • {product.category}
        </Card.Text>

        <div className="mb-2 d-flex align-items-center">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={i < product.rating ? "text-warning" : "text-muted"}
              size={12}
            />
          ))}
          <small className="ms-2 text-muted">({product.reviews} reviews)</small>
        </div>

        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fw-bold fs-6 text-primary">
              ₹
              {new Intl.NumberFormat("en-IN", {
                maximumFractionDigits: 0,
              }).format(product.price * USD_TO_INR_RATE)}
            </span>
            <span
              className={`badge ${
                product.inStock ? "bg-success" : "bg-danger"
              } rounded-pill small`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="d-grid gap-2">
            <div className="d-flex justify-content-between">
              {isInCart(product._id) ? (
                <Button
                  variant="success"
                  size="sm"
                  className="rounded-pill flex-grow-1"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate("/cart");
                  }}
                >
                  <FaShoppingCart className="me-2" />
                  View Cart
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  className="rounded-pill flex-grow-1"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <FaShoppingCart className="me-2" />
                  Add to Cart
                </Button>
              )}
            </div>

            <Button
              variant="warning"
              size="sm"
              className="rounded-pill fw-semibold"
              onClick={handleBuyNow}
              disabled={!product.inStock}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
