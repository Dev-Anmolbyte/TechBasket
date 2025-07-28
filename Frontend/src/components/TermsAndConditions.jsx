import React from "react";
import Container from "react-bootstrap/Container";

const TermsAndConditions = () => (
  <Container className="py-5" style={{ maxWidth: 800 }}>
    <h1 className="mb-4 text-center text-primary fw-bold">TechBasket Terms & Conditions</h1>
    <p className="text-muted text-center mb-5">
      Effective Date: 24 July 2025
    </p>
    
    <h4>1. Acceptance of Terms</h4>
    <p>
      By accessing or using the TechBasket website ("Site") and services, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with these terms, please refrain from using our Site.
    </p>
    
    <h4>2. User Accounts</h4>
    <ul>
      <li>You must be at least 18 years old to register and make purchases.</li>
      <li>You are responsible for maintaining the confidentiality of your account and password.</li>
      <li>All activity under your account is your responsibility.</li>
    </ul>
    
    <h4>3. Product Information & Pricing</h4>
    <ul>
      <li>We strive to ensure that all product details and prices are accurate, but errors may occur.</li>
      <li>We reserve the right to correct any errors, inaccuracies, or omissions, and to change or update information at any time without prior notice.</li>
    </ul>
    
    <h4>4. Orders & Payment</h4>
    <ul>
      <li>All orders are subject to acceptance and availability.</li>
      <li>We reserve the right to cancel or refuse any order at our sole discretion.</li>
      <li>Payment must be made in full before products are dispatched.</li>
    </ul>
    
    <h4>5. Shipping & Delivery</h4>
    <ul>
      <li>Shipping times are estimates only. TechBasket is not responsible for delivery delays beyond our control.</li>
      <li>Risk of loss and title for purchased items pass to you upon delivery to the carrier.</li>
    </ul>
    
    <h4>6. Returns & Refunds</h4>
    <ul>
      <li>Please review our Return Policy for detailed information on returns and refunds.</li>
      <li>Products must be returned unused and in original packaging within 7 days of receipt (unless otherwise specified).</li>
    </ul>
    
    <h4>7. Prohibited Uses</h4>
    <ul>
      <li>No unlawful, fraudulent, or abusive activity is permitted on this Site.</li>
      <li>You must not attempt to harm or disrupt our operations or security.</li>
    </ul>

    <h4>8. Intellectual Property</h4>
    <ul>
      <li>All content, design, text, graphics, logos, images, and software are the property of TechBasket or its licensors, protected by relevant intellectual property laws.</li>
      <li>No material from this Site may be copied, reproduced, republished, uploaded, or distributed without prior written consent.</li>
    </ul>
    
    <h4>9. Limitation of Liability</h4>
    <p>
      TechBasket shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of the Site or any products purchased.
    </p>
    
    <h4>10. Changes to Terms</h4>
    <p>
      We reserve the right to update or modify these Terms at any time. Continued use of the Site implies acceptance of the revised terms.
    </p>
    
    <h4>11. Governing Law</h4>
    <p>
      These Terms shall be governed according to the laws of [Your Country/State]. All disputes shall be subject to the exclusive jurisdiction of the courts at [Your Jurisdiction].
    </p>
    
    <h4>12. Contact Us</h4>
    <p>
      For any questions regarding these Terms and Conditions, please contact us at: <br/>
      <a href="mailto:support@techbasket.com">support@techbasket.com</a>
    </p>

    <hr className="my-4" />
    <p className="text-secondary small text-center">
      &copy; {new Date().getFullYear()} TechBasket. All rights reserved.
    </p>
  </Container>
);

export default TermsAndConditions;
