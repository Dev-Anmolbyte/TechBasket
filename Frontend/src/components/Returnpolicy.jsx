import React from "react";
import Container from "react-bootstrap/Container";

const ReturnPolicy = () => (
  <Container className="py-5" style={{ maxWidth: 800 }}>
    <h1 className="mb-4 text-center text-primary fw-bold">
      TechBasket Return & Refund Policy
    </h1>
    <p className="text-muted text-center mb-5">Effective Date: 24 July 2025</p>

    <h4>1. Overview</h4>
    <p>
      At TechBasket, customer satisfaction is our priority. If you are not
      completely satisfied with your purchase, we're here to help. This policy
      outlines the terms and process for returns, exchanges, and refunds.
    </p>

    <h4>2. Return Eligibility</h4>
    <ul>
      <li>
        Returns must be requested within <strong>7 days</strong> of receiving
        your order.
      </li>
      <li>
        Products must be unused, undamaged, and returned in the original
        packaging.
      </li>
      <li>
        Items such as software, digital goods, or consumables are non-returnable
        unless defective.
      </li>
    </ul>

    <h4>3. How to Initiate a Return</h4>
    <ul>
      <li>
        Email our support team at{" "}
        <a href="mailto:support@techbasket.com">support@techbasket.com</a> with
        your order ID and reason for return.
      </li>
      <li>
        We will review your request and provide instructions for return shipping
        if eligible.
      </li>
    </ul>

    <h4>4. Return Shipping</h4>
    <ul>
      <li>
        Customers are responsible for the cost of return shipping unless the
        item was received damaged or incorrect.
      </li>
      <li>
        Please ensure returned items are securely packed to prevent damage
        during transit.
      </li>
    </ul>

    <h4>5. Refund Process</h4>
    <ul>
      <li>
        Once we receive and inspect the returned item, we will notify you of the
        approval or rejection of your refund.
      </li>
      <li>
        If approved, refunds will be processed within{" "}
        <strong>7-10 business days</strong> to your original payment method.
      </li>
      <li>
        Shipping charges are non-refundable, except in cases of defective or
        incorrect items.
      </li>
    </ul>

    <h4>6. Exchanges</h4>
    <p>
      Exchanges are only offered for defective or damaged items. If you need to
      exchange a product, please contact our support team with details and
      images of the issue.
    </p>

    <h4>7. Non-Returnable Items</h4>
    <ul>
      <li>
        Opened software, digital downloads, and items marked as final sale.
      </li>
      <li>
        Any product not in its original condition or returned after 7 days from
        delivery.
      </li>
    </ul>

    <h4>8. Contact Us</h4>
    <p>
      If you have any questions or concerns regarding this Return Policy, please
      reach out to us at: <br />
      <a href="mailto:support@techbasket.com">support@techbasket.com</a>
    </p>

    <hr className="my-4" />
    <p className="text-secondary small text-center">
      &copy; {new Date().getFullYear()} TechBasket. All rights reserved.
    </p>
  </Container>
);

export default ReturnPolicy;
