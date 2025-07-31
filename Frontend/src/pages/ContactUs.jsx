import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="contact-us-section">
      <div className="map-overlay">
        <Container className="py-5 text-center text-white">
          <h1 className="fw-bold mb-5">Contact Us</h1>

          <Row className="g-4 contact-boxes">
            <Col md={4}>
              <Card className="contact-card h-100 text-center p-4">
                <FaEnvelope size={40} className="contact-icon" />
                <h5 className="mt-3 fw-bold">EMAIL ADDRESS</h5>
                <p className="mb-0">support@techbasket.com</p>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="contact-card h-100 text-center p-4">
                <FaPhoneAlt size={40} className="contact-icon" />
                <h5 className="mt-3 fw-bold">PHONE NUMBER</h5>
                <p className="mb-0">0124-4512134</p>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="contact-card h-100 text-center p-4">
                <FaMapMarkerAlt size={40} className="contact-icon" />
                <h5 className="mt-3 fw-bold">ADDRESS</h5>
                <p className="mb-0">
                  Tower B, Building No. 8,
                  <br />
                  DLF Cyber City, DLF Phase 2,
                  <br />
                  Sector 24, Gurugram, Haryana 122002
                </p>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default ContactUs;
