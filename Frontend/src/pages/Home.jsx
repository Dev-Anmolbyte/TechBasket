import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaShoppingBag,
  FaMicrochip,
  FaMemory,
  FaHdd,
  FaLightbulb,
  FaDeskpro,
  FaChessRook,
  FaBoxOpen,
  FaFan,
  FaBuffer,
  FaWindows,
  FaBehanceSquare,
  FaBatteryFull,
  FaBiohazard,
  FaBlogger,
} from "react-icons/fa";

const handleLinkClick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">
                Build Your Dream PC with TechBasket
              </h1>
              <p className="lead mb-4">
                Discover premium PC components from top brands. Quality hardware
                for enthusiasts, gamers, and professionals.
              </p>
              <Link to="/shopping">
                <Button variant="light" size="lg" className="me-3">
                  <FaShoppingBag className="me-2" />
                  Shop Now
                </Button>
              </Link>
            </Col>
            <Col lg={6}>
              <img
                src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&h=400&fit=crop"
                alt="PC Components"
                className="img-fluid rounded"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <Container className="my-5">
        <Row className="text-center mb-5">
          <Col>
            <h2>Why Choose TechBasket?</h2>
            <p className="text-muted">Your trusted partner for PC components</p>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="text-center h-100 border-0">
              <Card.Body>
                <div className="mb-3">
                  <FaMicrochip size={48} className="text-primary" />
                </div>
                <Card.Title>Premium Quality</Card.Title>
                <Card.Text>
                  Only authentic products from trusted manufacturers with full
                  warranty
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="text-center h-100 border-0">
              <Card.Body>
                <div className="mb-3">
                  <FaMemory size={48} className="text-primary" />
                </div>
                <Card.Title>Expert Support</Card.Title>
                <Card.Text>
                  Get personalized recommendations from our PC building experts
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="text-center h-100 border-0">
              <Card.Body>
                <div className="mb-3">
                  <FaHdd size={48} className="text-primary" />
                </div>
                <Card.Title>Fast Delivery</Card.Title>
                <Card.Text>
                  Quick and secure shipping with real-time order tracking
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Categories Section */}
      <section className="bg-light py-5">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2>Shop by Category</h2>
            </Col>
          </Row>
          <Row>
            {[
              { name: "Processors", icon: FaMicrochip, color: "primary" },
              { name: "Graphics Cards", icon: FaMemory, color: "success" },
              { name: "Memory", icon: FaHdd, color: "warning" },
              { name: "Storage", icon: FaMicrochip, color: "info" },
              { name: "Cooling", icon: FaFan, color: "warning" },
              { name: "MotherBoard", icon: FaDeskpro, color: "primary" },
              { name: "Power Supply", icon: FaLightbulb, color: "info" },
              { name: "Refresh Rate", icon: FaBuffer, color: "success" },
              { name: "RAM", icon: FaBlogger, color: "primary" },
              { name: "Operating System", icon: FaWindows, color: "warning" },
              { name: "Screen Size", icon: FaBehanceSquare, color: "info" },
              { name: "Security Feature", icon: FaBiohazard, color: "success" },
            ].map((category, index) => (
              <Col md={3} sm={6} key={index} className="mb-3">
                {/* <Link to="/shopping" className="text-decoration-none"> */}
                <Card className="text-center h-100 category-card">
                  <Card.Body className="d-flex flex-column align-items-center">
                    <category.icon
                      size={32}
                      className={`text-${category.color} mb-2`}
                    />
                    <Card.Title className="h5">{category.name}</Card.Title>
                  </Card.Body>
                </Card>
                {/* </Link>  */}
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <Container className="my-5">
        <Row className="text-center">
          <Col>
            <h3>Ready to Build Your PC?</h3>
            <p className="text-muted mb-4">
              Browse our extensive catalog of premium PC components
            </p>
            <Link to="/shopping">
              <Button onClick={handleLinkClick} variant="primary" size="lg">
                Start Shopping
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
