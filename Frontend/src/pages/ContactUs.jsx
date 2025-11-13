import React from "react";
import Container from "react-bootstrap/Container";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  const items = [
    {
      icon: <FaEnvelope size={40} className="icon" />,
      title: "EMAIL ADDRESS",
      text: "support@techbasket.com",
    },
    {
      icon: <FaPhoneAlt size={40} className="icon" />,
      title: "PHONE NUMBER",
      text: "0124-4512134",
    },
    {
      icon: <FaMapMarkerAlt size={40} className="icon" />,
      title: "ADDRESS",
      text: "Tower B, Building No. 8,\nDLF Cyber City, DLF Phase 2,\nSector 24, Gurugram, Haryana 122002",
    },
  ];

  return (
    <div className="contact-us-section">
      <div className="map-overlay">
        <Container className="py-5 text-center text-white">
          <h1 className="fw-bold mb-5">Contact Us</h1>
          <div className="contact-boxes">
            {items.map((item, i) => (
              <div className="contact-box" key={i}>
                {item.icon}
                <h5 className="mt-3">{item.title}</h5>
                <p style={{ whiteSpace: "pre-line" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ContactUs;
