import React, { useState } from "react";
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
} from "react-bootstrap";
import {
  FaShoppingCart,
  FaStar,
  FaArrowLeft,
  FaHeart,
  FaShare,
} from "react-icons/fa";
import { useAppContext } from "../App.jsx";
import { products } from "../data/products.js";

const USD_TO_INR = 83.5;

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specifications");

  const product = products.find((p) => p.id === parseInt(id));

  const isInCart = cart.some((item) => item.id === product.id);

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2>Product not found</h2>
        <Button variant="primary" onClick={() => navigate("/shopping")}>
          Back to Shopping
        </Button>
      </Container>
    );
  }

  //const handleAddToCart = () => {
  // addToCart(product, quantity);
  // };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  // Everything before return() remains unchanged

  return (
    <Container className="my-con py-4">
      {/* Breadcrumb */}
      <Row className="mb-3">
        <Col>
          <Button
            variant="outline-primary"
            className="px-3 py-2 rounded-pill shadow-sm d-inline-flex align-items-center back-button-hover"
            onClick={() => navigate(-1)}
            style={{
              fontWeight: "500",
              transition: "all 0.3s ease",
              gap: "8px",
            }}
          >
            <FaArrowLeft />
            Back to Products
          </Button>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Product Image */}
        <Col md={6}>
          <Card className="shadow-sm">
            <Card.Img
              variant="top"
              src={product.image}
              style={{ height: "400px", objectFit: "cover" }}
            />
          </Card>
        </Col>

        {/* Product Info */}
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
            {new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            }).format(product.price * USD_TO_INR * quantity)}
          </h3>

          <p className="mb-4 text-muted">{product.description}</p>

          {/* Stock Status */}
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

          {/* Quantity and Add to Cart */}
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
            <Col sm={8} className="d-flex align-items-end gap-2 mt-3 mt-sm-0">
              <Button
                variant={isInCart ? "success" : "primary"}
                size="lg"
                disabled={isInCart || !product.inStock}
                onClick={handleAddToCart}
                className="flex-fill"
              >
                <FaShoppingCart className="me-2" />
                {isInCart ? "Added to Cart" : "Add to Cart"}
              </Button>
              <Button variant="outline-danger" size="lg">
                <FaHeart />
              </Button>
              <Button variant="outline-secondary" size="lg">
                <FaShare />
              </Button>
            </Col>
          </Row>

          {/* Additional Info */}
          <Card className="bg-light border-0 shadow-sm">
            <Card.Body>
              <h6 className="fw-bold">Why Buy From TechBasket?</h6>
              <ul className="mb-0 small">
                <li>✓ Free shipping on orders over ₹5000</li>
                <li>✓ 30-day return policy</li>
                <li>✓ 2-year manufacturer warranty</li>
                <li>✓ Expert technical support</li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Product Details Tabs */}
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
                    {Object.entries(product.specifications).map(
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
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-warning" size={16} />
                      ))}
                      <span className="ms-2">
                        <strong>John D.</strong> - Verified Purchase
                      </span>
                    </div>
                    <p className="mb-1">
                      Excellent performance and great value for money!
                    </p>
                    <small className="text-muted">Posted 2 days ago</small>
                  </div>
                  <hr />
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      {[...Array(4)].map((_, i) => (
                        <FaStar key={i} className="text-warning" size={16} />
                      ))}
                      <FaStar className="text-muted" size={16} />
                      <span className="ms-2">
                        <strong>Sarah M.</strong> - Verified Purchase
                      </span>
                    </div>
                    <p className="mb-1">
                      Works perfectly with my setup. Fast shipping too!
                    </p>
                    <small className="text-muted">Posted 1 week ago</small>
                  </div>
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
  );
};

export default ProductDetails;
