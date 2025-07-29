import React from "react";
import Container from "react-bootstrap/Container";
import "./contact.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="contact-us-section">
      <div className="map-overlay">
        <Container className="py-5 text-center text-white">
          <h1 className="fw-bold mb-5">Contact Us</h1>
          <div className="contact-boxes">
            <div className="contact-box">
              <FaEnvelope size={40} className="icon" />
              <h5 className="mt-3">EMAIL ADDRESS</h5>
              <p>support@techbasket.com</p>
            </div>
            <div className="contact-box">
              <FaPhoneAlt size={40} className="icon" />
              <h5 className="mt-3">PHONE NUMBER</h5>
              <p>0124-4512134</p>
            </div>
            <div className="contact-box">
              <FaMapMarkerAlt size={40} className="icon" />
              <h5 className="mt-3">ADDRESS</h5>
              <p>
                Tower B, Building No. 8,<br />
                DLF Cyber City, DLF Phase 2,<br />
                Sector 24, Gurugram, Haryana 122002
              </p>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ContactUs;
