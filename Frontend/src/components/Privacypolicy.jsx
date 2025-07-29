import React from "react";
import Container from "react-bootstrap/Container";

const PrivacyPolicy = () => (
  <Container className="py-5" style={{ maxWidth: 800 }}>
    <h1 className="mb-4 text-center text-primary fw-bold">
      TechBasket Privacy Policy
    </h1>
    <p className="text-muted text-center mb-5">Effective Date: 24 July 2025</p>

    <h4>1. Introduction</h4>
    <p>
      At TechBasket, we are committed to protecting your privacy. This Privacy
      Policy explains how we collect, use, disclose, and safeguard your
      information when you visit our website or use our services.
    </p>

    <h4>2. Information We Collect</h4>
    <ul>
      <li>
        <strong>Personal Information:</strong> Name, email address, shipping
        address, billing information, and phone number.
      </li>
      <li>
        <strong>Account Information:</strong> Login credentials, purchase
        history, and communication preferences.
      </li>
      <li>
        <strong>Technical Data:</strong> IP address, browser type, device
        information, and cookies.
      </li>
    </ul>

    <h4>3. How We Use Your Information</h4>
    <ul>
      <li>To process transactions and manage your orders.</li>
      <li>To personalize your experience and improve customer service.</li>
      <li>
        To send periodic emails regarding your order or other products and
        services.
      </li>
      <li>To enhance website security and prevent fraud.</li>
    </ul>

    <h4>4. Sharing Your Information</h4>
    <ul>
      <li>
        We do not sell, rent, or trade your personal information to third
        parties.
      </li>
      <li>
        We may share information with trusted partners who assist us in
        operating the website or conducting business, as long as they agree to
        keep it confidential.
      </li>
      <li>
        We may also disclose your information when required by law or to protect
        our legal rights.
      </li>
    </ul>

    <h4>5. Data Security</h4>
    <p>
      We implement a variety of security measures to maintain the safety of your
      personal information. However, no method of transmission over the Internet
      is 100% secure, and we cannot guarantee absolute security.
    </p>

    <h4>6. Cookies & Tracking Technologies</h4>
    <p>
      We use cookies and similar technologies to enhance your browsing
      experience, analyze site traffic, and understand user behavior. You can
      manage your cookie preferences through your browser settings.
    </p>

    <h4>7. Your Rights & Choices</h4>
    <ul>
      <li>
        You may update or correct your personal information at any time by
        logging into your account.
      </li>
      <li>
        You can opt out of marketing emails by clicking the "unsubscribe" link
        in our emails.
      </li>
      <li>
        You may request the deletion of your account by contacting our support
        team.
      </li>
    </ul>

    <h4>8. Third-Party Links</h4>
    <p>
      Our website may contain links to third-party websites. We are not
      responsible for the content or privacy practices of those sites. Please
      review their privacy policies before providing any personal information.
    </p>

    <h4>9. Children's Privacy</h4>
    <p>
      Our services are not intended for children under the age of 13. We do not
      knowingly collect personal information from minors.
    </p>

    <h4>10. Changes to This Policy</h4>
    <p>
      We reserve the right to modify this Privacy Policy at any time. Any
      changes will be posted on this page with the updated effective date.
      Continued use of the site implies your acceptance of the updated policy.
    </p>

    <h4>11. Contact Us</h4>
    <p>
      If you have any questions or concerns regarding this Privacy Policy, you
      may contact us at: <br />
      <a href="mailto:support@techbasket.com">support@techbasket.com</a>
    </p>

    <hr className="my-4" />
    <p className="text-secondary small text-center">
      &copy; {new Date().getFullYear()} TechBasket. All rights reserved.
    </p>
  </Container>
);

export default PrivacyPolicy;
