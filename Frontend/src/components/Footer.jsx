import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
 

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 mt-5">
      <Container>
        <Row>
          <Col md={3} className="mb-4">
            <h5 className="fw-bold mb-3">TechBasket</h5>
            <p className="small">
              Your trusted partner for premium PC components. Quality hardware 
              for enthusiasts, gamers, and professionals.
            </p>
            <div className="d-flex">
              <a href="#" className="text-light me-3"><FaFacebook size={20} /></a>
              <a href="#" className="text-light me-3"><FaTwitter size={20} /></a>
              <a href="#" className="text-light me-3"><FaInstagram size={20} /></a>
              <a href="#" className="text-light"><FaLinkedin size={20} /></a>
            </div>
          </Col>
          
          <Col md={3} className="mb-4">
            <h6 className="fw-bold mb-3">Quick Links</h6>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/shopping" className="text-light text-decoration-none">Shop</Link></li>
              <li><Link to="/cart" className="text-light text-decoration-none">Cart</Link></li>
              <li><Link to="/orders" className="text-light text-decoration-none">Order History</Link></li>
            </ul>
          </Col>
          
          <Col md={3} className="mb-4">
            <h6 className="fw-bold mb-3">Categories</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-light text-decoration-none">Processors</a></li>
              <li><a href="#" className="text-light text-decoration-none">Graphics Cards</a></li>
              <li><a href="#" className="text-light text-decoration-none">Memory</a></li>
              <li><a href="#" className="text-light text-decoration-none">Storage</a></li>
            </ul>
          </Col>
          
          <Col md={3} className="mb-4">
            <h6 className="fw-bold mb-3">Contact Us</h6>
            <div className="small">
              <div className="mb-2">
                <FaMapMarkerAlt className="me-2" />
                Tower B, Building No, 8, DLF Cyber City, DLF Phase 2, Sector 24, Gurugram, Haryana 122002
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
              <a href="/privacy" className="text-light text-decoration-none me-3">Privacy Policy</a>
              <a href="/terms" className="text-light text-decoration-none me-3">Terms of Service</a>
              <a href="/return" className="text-light text-decoration-none">Return Policy</a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer