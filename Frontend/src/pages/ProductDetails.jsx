// No change to imports
import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
  Tab,
  Tabs,
  Spinner,
} from "react-bootstrap";
import {
  FaShoppingCart,
  FaStar,
  FaArrowLeft,
  FaHeart,
  FaShare,
} from "react-icons/fa";
import { useAppContext } from "../App.jsx";
import axios from "axios";
import { motion } from "framer-motion";
import gsap from "gsap";

const USD_TO_INR = 83.5;

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, removeFromCart, cart, user } = useAppContext();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specifications");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [liked, setLiked] = useState(false);

  const glowButtonsRef = useRef([]);
const imageRef=useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      glowButtonsRef.current.forEach((btn) => {
        if (btn) {
          gsap.to(btn, {
            boxShadow: "0 0 20px 4px rgba(255, 255, 255, 0.5)",
            repeat: -1,
            yoyo: true,
            duration: 1.5,
            ease: "power1.inOut",
          });
        }
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);

        const cartItem = cart.find(
          (item) => item.productId?._id === res.data._id
        );
        if (cartItem) {
          setQuantity(cartItem.quantity);
        }
      } catch (err) {
        console.error("Failed to load product:", err.message);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user?.token) {
      navigate("/login");
      return;
    }
    addToCart(product._id, quantity);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product._id);
  };

  const isInCart =
    product && cart.some((item) => item.productId?._id === product._id);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) {
      setQuantity(value);
      if (product && cart.some((item) => item.productId?._id === product._id)) {
        addToCart(product, value);
      }
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading product...</p>
      </Container>
    );
  }

  if (!product || error) {
    return (
      <Container className="py-5 text-center">
        <h2>{error || "Product not found"}</h2>
        <Button variant="primary" onClick={() => navigate("/shopping")}>
          Back to Shopping
        </Button>
      </Container>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Container className="my-con py-4">
        <Row className="mb-3">
          <Col>
            <Button
  variant="outline-primary"
  className="px-3 py-2 rounded-pill shadow-sm d-inline-flex align-items-center"
  onClick={() => navigate(-1)}
  style={{ fontWeight: "500", gap: "8px" }}
>
  <FaArrowLeft /> Back
</Button>

          </Col>
        </Row>

        <Row className="g-4">
          <Col md={6}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <Card className="shadow-sm">
                <Card className="shadow-sm">
                  <motion.img
                    ref={imageRef}
                    src={product.image}
                    alt={product.name}
                    className="product-image-animate"
                    style={{
                      height: "400px",
                      objectFit: "cover",
                      width: "100%",
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  />
                </Card>
              </Card>
            </motion.div>
          </Col>

          <Col md={6}>
            <div className="mb-3 d-flex gap-2">
              <Badge bg="secondary">{product.category}</Badge>
              <Badge bg="info">{product.brand}</Badge>
            </div>

            <h2 className="fw-bold mb-3">{product.name}</h2>

            <div className="mb-3 d-flex align-items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={i < product.rating ? "text-warning" : "text-muted"}
                  size={20}
                />
              ))}
              <span className="ms-2 text-muted">
                {product.rating}/5 ({product.reviews} reviews)
              </span>
            </div>

            <h3 className="text-primary fw-semibold mb-4">
              ₹
              {new Intl.NumberFormat("en-IN", {
                maximumFractionDigits: 0,
              }).format(product.price * USD_TO_INR * quantity)}
            </h3>

            <p className="mb-4 text-muted">{product.description}</p>

            <div className="mb-4">
              {product.inStock ? (
                <Badge bg="success" className="fs-6">
                  ✓ In Stock
                </Badge>
              ) : (
                <Badge bg="danger" className="fs-6">
                  ✗ Out of Stock
                </Badge>
              )}
            </div>

            <Row className="mb-4">
              <Col sm={4}>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={handleQuantityChange}
                    disabled={!product.inStock}
                  />
                </Form.Group>
              </Col>

              <Col sm={8} className="d-flex flex-column gap-2 mt-3 mt-sm-0">
                <motion.button
                  ref={(el) => (glowButtonsRef.current[0] = el)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="btn btn-warning btn-lg rounded w-100 glow-button"
                  disabled={!product.inStock}
                  onClick={() => {
                    if (user) {
                      navigate("/checkout", { state: { product, quantity } });
                    } else {
                      navigate("/login");
                    }
                  }}
                >
                  Buy Now
                </motion.button>

                <motion.button
                  ref={(el) => (glowButtonsRef.current[1] = el)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className={`btn btn-lg rounded w-100 ${
                    isInCart ? "btn-danger" : "btn-primary"
                  }`}
                  disabled={!product.inStock}
                  onClick={() =>
                    isInCart ? handleRemoveFromCart() : handleAddToCart()
                  }
                >
                  <FaShoppingCart className="me-2" />
                  {isInCart ? "Remove from Cart" : "Add to Cart"}
                </motion.button>

                <div className="d-flex gap-2">
                  <motion.button
                    ref={(el) => (glowButtonsRef.current[2] = el)}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="btn btn-outline-danger btn-lg flex-fill rounded"
                    onClick={() => setLiked(!liked)}
                  >
                    <FaHeart className={liked ? "text-danger" : ""} />
                  </motion.button>

                  <motion.button
                    ref={(el) => (glowButtonsRef.current[3] = el)}
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="btn btn-outline-secondary btn-lg flex-fill rounded"
                    onClick={() => alert("Share feature coming soon!")}
                  >
                    <FaShare />
                  </motion.button>
                </div>
              </Col>
            </Row>

            <Card className="bg-dark border-0 shadow-sm mt-auto">
              <Card.Body>
                <h6 className="fw-semibold">Why Buy From TechBasket?</h6>
                <ul className="mb-0 small text-white">
                  <li>✓ Free shipping on orders over ₹5000</li>
                  <li>✓ 30-day return policy</li>
                  <li>✓ 2-year manufacturer warranty</li>
                  <li>✓ Expert technical support</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-3"
            >
              <Tab eventKey="specifications" title="Specifications">
                <Card className="shadow-sm">
                  <Card.Body>
                    <Row>
                      {product.specifications &&
                        Object.entries(product.specifications).map(
                          ([key, value]) => (
                            <Col md={6} key={key} className="mb-2">
                              <strong>
                                {key
                                  .replace(/([A-Z])/g, " $1")
                                  .replace(/^./, (str) => str.toUpperCase())}
                                :
                              </strong>{" "}
                              <span className="text-muted">{value}</span>
                            </Col>
                          )
                        )}
                    </Row>
                  </Card.Body>
                </Card>
              </Tab>

              <Tab eventKey="reviews" title="Reviews">
                <Card className="shadow-sm">
                  <Card.Body>
                    <h5 className="fw-semibold">Customer Reviews</h5>
                    <p className="text-muted">Coming soon...</p>
                  </Card.Body>
                </Card>
              </Tab>

              <Tab eventKey="shipping" title="Shipping & Returns">
                <Card className="shadow-sm">
                  <Card.Body>
                    <h5 className="fw-semibold">Shipping Information</h5>
                    <ul>
                      <li>Free standard shipping on orders over ₹5000</li>
                      <li>Express shipping available for ₹860</li>
                      <li>Most orders ship within 1-2 business days</li>
                      <li>Tracking information provided via email</li>
                    </ul>

                    <h5 className="mt-4 fw-semibold">Return Policy</h5>
                    <ul>
                      <li>30-day return window</li>
                      <li>Items must be in original condition</li>
                      <li>Free returns on defective items</li>
                      <li>
                        Return shipping fees may apply for non-defective returns
                      </li>
                    </ul>
                  </Card.Body>
                </Card>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default ProductDetails;
