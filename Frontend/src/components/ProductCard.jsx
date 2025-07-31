import React from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useAppContext } from "../App.jsx";
import { useNavigate } from "react-router-dom";



const USD_TO_INR = 83.5;

const ProductCard = ({ product }) => {

  
  const { addToCart,  cart, user } = useAppContext();

  const isInCart = cart.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  //scroll

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigate = useNavigate();

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return null;
    }
    navigate("/checkout", { state: { product } });
  };

  return (
    <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden product-card">
      <div className="bg-light text-center p-2">
        <Card.Img
          variant="top"
          src={product.image}
          style={{
            height: "180px",
            width: "100%",
            objectFit: "cover",
            borderRadius: "0.5rem",
          }}
        />
      </div>
      <Card.Body className="d-flex flex-column px-3 py-3">
        <Card.Title className="h6 fw-semibold text-dark mb-1">
          {product.name}
        </Card.Title>
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
              }).format(product.price * USD_TO_INR)}
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
            {/* Row with View Details and Add to Cart */}
            <div className="d-flex justify-content-between">
              <Link
                to={`/product/${product.id}`}
                onClick={handleLinkClick}
                className="me-2 flex-grow-1"
              >
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="rounded-pill w-100"
                >
                  View Details
                </Button>
              </Link>
              {isInCart ? (
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
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
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
