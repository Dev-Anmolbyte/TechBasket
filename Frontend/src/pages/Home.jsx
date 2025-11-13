import React, { useEffect, useRef } from "react";
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
import gsap from "gsap";

const handleLinkClick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const Home = () => {
  const heroRef = useRef();
  const heroImageRef = useRef();
  const featureCardsRef = useRef([]);
  const categoryCardsRef = useRef([]);
  const floatingIconsRef = useRef([]);
  const glowTextRef = useRef();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    

    // Hero Entrance
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    
    // Category Cards Entrance
    gsap.fromTo(
      categoryCardsRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.3,
        stagger: 0.15,
        ease: "power2.out",
      }
    );

    // Floating Icons Bounce
    floatingIconsRef.current.forEach((icon, i) => {
      gsap.to(icon, {
        y: -8,
        repeat: -1,
        yoyo: true,
        duration: 1.2 + i * 0.1,
        ease: "sine.inOut",
      });
    });

    // Color Glow for Each Icon
    const glowColors = [
      "#00f0ff",
      "#00ff6a",
      "#ffcc00",
      "#0080ff",
      "#ff66cc",
      "#6600ff",
      "#ff3300",
      "#33ffcc",
      "#ff00ff",
    ];

    floatingIconsRef.current.forEach((icon, i) => {
      const color = glowColors[i % glowColors.length];
      if (icon) {
        gsap.to(icon, {
          color,
          filter: `drop-shadow(0 0 4px ${color}) drop-shadow(0 0 8px ${color})`,
          repeat: -1,
          yoyo: true,
          duration: 2,
          ease: "power1.inOut",
        });
      }
    });

    // Add zoom in/out to category cards
    categoryCardsRef.current.forEach((card) => {
      gsap.to(card, {
        scale: 1.02,
        duration: 2.5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    });
  }, []);

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <div ref={heroRef}>
                <h1 className="display-4 fw-bold mb-4">
                  <span >
                    Build Your Dream PC with TechBasket
                  </span>
                </h1>
                <p className="lead mb-4">
                  Discover premium PC components from top brands. Quality
                  hardware for enthusiasts, gamers, and professionals.
                </p>
                <Link to="/shopping">
                  <Button
                    variant="light"
                    size="lg"
                    className="me-3 shadow-sm shop-now-btn"
                  >
                    <FaShoppingBag className="me-2" />
                    Shop Now
                  </Button>
                </Link>
              </div>
            </Col>
            <Col lg={6}>
              <img
                ref={heroImageRef}
                src="https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=600&h=400&fit=crop"
                alt="PC Components"
                className="img-fluid rounded glow-image zoom-bounce-image"
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
          {[FaMicrochip, FaMemory, FaHdd].map((Icon, i) => (
            <Col md={4} className="mb-4" key={i}>
              <div
                ref={(el) => (featureCardsRef.current[i] = el)}
                className="h-100"
              >
                <Card className="text-center h-100 border-0 feature-card">
                  <Card.Body>
                    <div className="mb-3">
                      <Icon
                        size={48}
                        className="text-primary"
                        ref={(el) => (floatingIconsRef.current[i] = el)}
                      />
                    </div>
                    <Card.Title>
                      {i === 0
                        ? "Premium Quality"
                        : i === 1
                        ? "Expert Support"
                        : "Fast Delivery"}
                    </Card.Title>
                    <Card.Text>
                      {i === 0 &&
                        "Only authentic products from trusted manufacturers with full warranty"}
                      {i === 1 &&
                        "Get personalized recommendations from our PC building experts"}
                      {i === 2 &&
                        "Quick and secure shipping with real-time order tracking"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Shop by Category Section */}
      <section className="category-section py-5">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2>Shop by Category</h2>
            </Col>
          </Row>
          <Row className="justify-content-center">
            {[
              { name: "Processors", icon: FaMicrochip, color: "primary" },
              { name: "Graphics Cards", icon: FaMemory, color: "success" },
              { name: "Memory", icon: FaHdd, color: "warning" },
              { name: "Storage", icon: FaMicrochip, color: "info" },
              { name: "Cooling", icon: FaFan, color: "warning" },
              { name: "MotherBoard", icon: FaDeskpro, color: "primary" },
              { name: "Power Supply", icon: FaLightbulb, color: "info" },
              { name: "Cabinet", icon: FaBuffer, color: "success" },
              { name: "Peripherals", icon: FaBlogger, color: "primary" },
            ].map((category, index) => (
              <Col md={3} sm={6} key={index} className="mb-3">
                <div
                  ref={(el) => (categoryCardsRef.current[index] = el)}
                  className="h-100"
                >
                  <Card className="text-center h-100 category-card">
                    <Card.Body className="d-flex flex-column align-items-center">
                      <category.icon
                        size={32}
                        className={`text-${category.color} mb-2`}
                        ref={(el) => (floatingIconsRef.current[index + 3] = el)}
                      />
                      <Card.Title className="h5">{category.name}</Card.Title>
                    </Card.Body>
                  </Card>
                </div>
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
              <Button
                onClick={handleLinkClick}
                variant="primary"
                size="lg"
                className="start-shopping-btn"
              >
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
