import React, { useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import { motion } from "framer-motion";
import gsap from "gsap";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
const ContactUs = () => {
  const overlayRef = useRef(null);

  // Animate background overlay gradient with GSAP
  useEffect(() => {
    gsap.to(overlayRef.current, {
      backgroundPosition: "200% center",
      duration: 10,
      ease: "linear",
      repeat: -1,
    });
  }, []);

  // Framer Motion fade-up variants
  const boxVariant = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
    }),
  };

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
    <div
      className="contact-us-section"
      style={{
        position: "relative",
        backgroundImage: "url('/images/contact-bg.jpg')", // ✅ your background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      {/* Animated gradient overlay */}
      <div
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(270deg, rgba(0,0,0,0.6), rgba(0,0,0,0.8), rgba(0,0,0,0.6))",
          backgroundSize: "400% 400%",
          zIndex: 1,
        }}
      ></div>

      {/* Content */}
      <div className="map-overlay" style={{ position: "relative", zIndex: 2 }}>
        <Container className="py-5 text-center text-white">
          <motion.h1
            className="fw-bold mb-5"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Contact Us
          </motion.h1>

          <div className="contact-boxes">
            {items.map((item, i) => (
              <motion.div
                key={i}
                className="contact-box"
                variants={boxVariant}
                initial="hidden"
                animate="visible"
                custom={i}
                whileHover={{
                  scale: 1.1,
                  y: -8,
                  transition: { type: "spring", stiffness: 300 },
                  boxShadow: "0 15px 30px rgba(0,0,0,0.4)",
                }}
              >
                {item.icon}
                <h5 className="mt-3">{item.title}</h5>
                <p style={{ whiteSpace: "pre-line" }}>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>
    </div>
  );
};

export default ContactUs;
