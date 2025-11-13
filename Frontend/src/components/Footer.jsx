import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import gsap from "gsap";

const Footer = () => {
  const colRefs = useRef([]);
  const iconRefs = useRef([]);

  useEffect(() => {
    colRefs.current.forEach((col, i) => {
      if (!col) return;
      gsap.fromTo(
        col,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: i * 0.2, ease: "power3.out" }
      );
    });

    iconRefs.current.forEach((icon, i) => {
      if (!icon) return;
      gsap.to(icon, {
        y: -4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 1 + i * 0.2,
      });
      gsap.set(icon, {
        transition: "transform 0.3s ease, filter 0.3s ease",
      });
    });
  }, []);

  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row>
          <Col md={3} className="mb-4" ref={(el) => (colRefs.current[0] = el)}>
            <h5 className="fw-bold mb-3">TechBasket</h5>
            <p className="small">
              Your trusted partner for premium PC components. Quality hardware
              for enthusiasts, gamers, and professionals.
            </p>
            <div className="social-icons d-flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                ref={(el) => (iconRefs.current[0] = el)}
              >
                <FaFacebook size={24} color="#1877F2" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                ref={(el) => (iconRefs.current[1] = el)}
              >
                <FaTwitter size={24} color="#1DA1F2" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                ref={(el) => (iconRefs.current[2] = el)}
              >
                <FaInstagram size={24} color="#E1306C" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                ref={(el) => (iconRefs.current[3] = el)}
              >
                <FaLinkedin size={24} color="#0A66C2" />
              </a>
            </div>
          </Col>

          <Col md={3} className="mb-4" ref={(el) => (colRefs.current[1] = el)}>
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shopping"
                  className="text-light text-decoration-none"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-light text-decoration-none">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-light text-decoration-none">
                  Order History
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={3} className="mb-4" ref={(el) => (colRefs.current[2] = el)}>
            <h6 className="fw-bold mb-3">Categories</h6>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Processors
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Graphics Cards
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Memory
                </a>
              </li>
              <li>
                <a href="#" className="text-light text-decoration-none">
                  Storage
                </a>
              </li>
            </ul>
          </Col>

          <Col md={3} className="mb-4" ref={(el) => (colRefs.current[3] = el)}>
            <h6 className="fw-bold mb-3">Contact Us</h6>
            <div className="small">
              <div className="mb-2">
                <FaMapMarkerAlt className="me-2" />
                Tower B, Building No, 8, DLF Cyber City, DLF Phase 2, Sector 24,
                Gurugram, Haryana 122002
              </div>
              <div className="mb-2">
                <FaPhone className="me-2" />
                01244512134
              </div>
              <div className="mb-2">
                <FaEnvelope className="me-2" />
                support@techbasket.com
              </div>
            </div>
          </Col>
        </Row>

        <hr className="my-4" />

        <Row className="align-items-center">
          <Col md={6}>
            <p className="small mb-0">
              &copy; 2025 TechBasket. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-end">
            <div className="small">
              <a
                href="/privacy"
                className="text-light text-decoration-none me-3"
              >
                Privacy Policy
              </a>
              <a href="/terms" className="text-light text-decoration-none me-3">
                Terms of Service
              </a>
              <a href="/return" className="text-light text-decoration-none">
                Return Policy
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
