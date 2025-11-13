import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaEye, FaDownload } from "react-icons/fa";
import { useAppContext } from "../App.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const MyOrders = () => {
  const USD_TO_INR = 87.7;
  const { user } = useAppContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/orders/my-orders",
          config
        );

        setOrders(
          [...response.data].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError("Failed to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const formatINR = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);


  const generateInvoice = (order) => {
    const doc = new jsPDF();
    const marginLeft = 14;

    // Header
    doc.setFontSize(18);
    doc.text("TechBasket", marginLeft, 20);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text("Tech Solutions for Every Need", marginLeft, 27);

    // Invoice Title
    doc.setFontSize(16);
    doc.setTextColor(0);
    doc.text("Invoice", 150, 20);

    // Customer & Order Info
    doc.setFontSize(11);
    doc.setTextColor(50);
    doc.text(`Order ID: ${order._id}`, marginLeft, 40);
    doc.text(
      `Order Date: ${new Date(order.orderDate).toLocaleDateString()}`,
      marginLeft,
      46
    );
    doc.text(
      `Customer: ${order.billingInfo.firstName} ${order.billingInfo.lastName}`,
      marginLeft,
      52
    );
    doc.text(
      `Address: ${order.billingInfo.address}, ${order.billingInfo.city}, ${order.billingInfo.state} - ${order.billingInfo.zipCode}`,
      marginLeft,
      58
    );

    // Table
    const tableColumn = ["#", "Product", "Qty", "Price (₹)", "Total (₹)"];
    const tableRows = [];

    order.items.forEach((item, index) => {
      tableRows.push([
        index + 1,
        item.name,
        item.quantity,
        (item.price * 87.7).toFixed(2),
        (item.price * item.quantity * 87.7).toFixed(2),
      ]);
    });

    doc.autoTable({
      startY: 70,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      headStyles: {
        fillColor: [33, 150, 243],
        textColor: 255,
        halign: "center",
      },
      bodyStyles: { halign: "center" },
      alternateRowStyles: { fillColor: [240, 240, 240] },
    });

    // Totals
    let finalY = doc.lastAutoTable.finalY + 10;

    // If space is too small for totals, add a new page
    if (finalY > 240) {
      doc.addPage();
      finalY = 20;
    }

    const total = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity * 87.7 ,
      0
    );
    const tax = total * 0.08;
    const shipping = total > 5000 ? 0 : 860;

    // Totals Box
    doc.setFontSize(12);
    doc.setDrawColor(0);
    doc.setFillColor(245, 245, 245);
    doc.rect(130, finalY - 6, 65, 28, "F"); // Light gray background

    doc.text(`Subtotal: ₹${total.toFixed(2)}`, 132, finalY);
    doc.text(`Tax (8%): ₹${tax.toFixed(2)}`, 132, finalY + 6);
    doc.text(`Shipping: ₹${shipping.toFixed(2)}`, 132, finalY + 12);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(
      `Grand Total: ₹${(total + tax + shipping).toFixed(2)}`,
      110,
      finalY + 20,
      { align: "left" }
    );

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text("Thank you for shopping with TechBasket!", marginLeft, 285);
    doc.text(
      "Contact: support@techbasket.com | +91 720977 6853",
      marginLeft,
      291
    );

    doc.save(`invoice_${order._id}.pdf`);
  };

  const handleCancelOrder = async (orderId) => {
    if (!user) {
      alert("You must be logged in to cancel an order.");
      return;
    }

    if (window.confirm("Are you sure you want to cancel this order?")) {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      try {
        await axios.put(
          `http://localhost:5000/api/orders/cancel/${orderId}`,
          {},
          config
        );
        setOrders(
          orders.map((order) =>
            order._id === orderId ? { ...order, status: "cancelled" } : order
          )
        );
        alert("Order cancelled successfully!");
      } catch (err) {
        console.error("Failed to cancel order:", err);
        alert("Failed to cancel order. Please try again.");
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "warning";
      case "processing":
        return "info";
      case "shipped":
        return "primary";
      case "delivered":
        return "success";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (!user) {
    return (
      <Container className="py-5 text-center">
        <h2>Please log in to view your orders</h2>
        <Link to="/login">
          <Button variant="primary">Login</Button>
        </Link>
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <h2>Loading Orders...</h2>
        <div className="spinner-border text-primary mt-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <h2 className="text-danger">{error}</h2>
      </Container>
    );
  }

  return (
    <Container fluid className="my-orders-page">
      <Row className="mb-4 my-orders-header">
        <Col>
          <h1 className="fw-semibold">My Orders</h1>
          <p className="text-muted">Track and manage your purchases</p>
        </Col>
      </Row>

      {orders.length === 0 ? (
        <Row className="justify-content-center">
          <Col md={6} className="empty-orders">
            <FaShoppingBag size={64} className="text-muted mb-4" />
            <h3>No Orders Yet</h3>
            <p className="text-muted mb-4">
              You haven't placed any orders. Start shopping now!
            </p>
            <Link to="/shopping">
              <Button variant="primary" size="lg">
                Start Shopping
              </Button>
            </Link>
          </Col>
        </Row>
      ) : (
        <Row className="g-4">
          {orders.map((order) => {
            const orderTotal =
              order.totals?.total ||
              order.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              );
            const tax = orderTotal * 0.08;
            const shipping = orderTotal > 50 ? 0 : 9.99;

            return (
              <Col md={12} key={order._id}>
                <Card className="order-card">
                  {/* Header */}
                  <Card.Header className="order-card-header">
                    <Row className="align-items-center">
                      <Col xs={12} md={3} className="mb-2 mb-md-0">
                        <div className="order-id">
                          Order #{order._id.substring(0, 8)}
                        </div>
                        <small className="order-date">
                          Placed on {formatDate(order.orderDate)}
                        </small>
                      </Col>
                      <Col xs={6} md={2} className="mb-2 mb-md-0">
                        <Badge
                          bg={getStatusColor(order.status)}
                          className="text-capitalize px-3 py-2"
                        >
                          {order.status}
                        </Badge>
                      </Col>
                      <Col xs={6} md={2} className="mb-2 mb-md-0">
                        <div className="order-total">
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 0,
                          }).format((orderTotal + shipping + tax) * USD_TO_INR)}
                        </div>
                      </Col>
                      <Col xs={12} md={2} className="mb-2 mb-md-0">
                        <small className="text-muted">
                          {order.items.length} item
                          {order.items.length !== 1 ? "s" : ""}
                        </small>
                      </Col>
                      <Col
                        xs={12}
                        md={3}
                        className="d-flex justify-content-md-end gap-2 flex-wrap"
                      >
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() =>
                            navigate(`/product/${order.items[0].product}`)
                          }
                        >
                          <FaEye className="me-1" /> View
                        </Button>

                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => generateInvoice(order)}
                        >
                          <FaDownload className="me-1" /> Invoice
                        </Button>
                        {["pending", "processing"].includes(
                          order.status.toLowerCase()
                        ) && (
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleCancelOrder(order._id)}
                          >
                            Cancel
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Card.Header>

                  {/* Body */}
                  <Card.Body>
                    <Row className="g-4">
                      {/* Items */}
                      <Col md={8}>
                        <h6 className="fw-semibold">Items Ordered:</h6>
                        <div className="item-list">
                          {order.items.slice(0, 3).map((item) => (
                            <div
                              key={`${order._id}-${item._id}`}
                              className="item-row"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="item-image"
                              />
                              <div className="item-details">
                                <h6>{item.name}</h6>
                                <small>Qty: {item.quantity}</small>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <small className="text-muted">
                              and {order.items.length - 3} more item(s)
                            </small>
                          )}
                        </div>
                      </Col>

                      {/* Delivery Info */}
                      <Col md={4}>
                        <h6 className="fw-semibold">Delivery Information:</h6>
                        {order.billingInfo && (
                          <div className="delivery-info-box small mt-3">
                            <div>
                              {order.billingInfo.firstName}{" "}
                              {order.billingInfo.lastName}
                            </div>
                            <div>{order.billingInfo.address}</div>
                            <div>
                              {order.billingInfo.city},{" "}
                              {order.billingInfo.state}{" "}
                              {order.billingInfo.zipCode}
                            </div>
                          </div>
                        )}
                      </Col>
                    </Row>

                    {/* Summary */}
                    <Row className="mt-4">
                      <Col md={8}>
                        <div className="order-summary-box">
                          <h6 className="fw-semibold">Order Summary:</h6>
                          <div className="small">
                            <div>
                              <strong>Qty:</strong>{" "}
                              {order.items.reduce(
                                (sum, item) => sum + item.quantity,
                                0
                              )}
                            </div>
                            <div>
                              <strong>Price:</strong>{" "}
                              {formatINR(
                                order.items.reduce(
                                  (sum, item) =>
                                    sum + item.price * item.quantity,
                                  0
                                ) * USD_TO_INR
                              )}
                            </div>
                            <div>
                              <strong>Tax:</strong>
                              {formatINR(tax * USD_TO_INR)}
                            </div>
                            <div>
                              <strong>Shipping:</strong>
                              {formatINR(shipping * USD_TO_INR)}
                            </div>
                            <div className="fw-bold mt-2">
                              <strong>Total:</strong> 
                             {formatINR(orderTotal * USD_TO_INR + shipping * USD_TO_INR + tax * USD_TO_INR)}
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>

                    {/* Timeline */}
                    <Row className="mt-5">
                      <Col>
                        <div className="timeline">
                          {[
                            "Order Placed",
                            "Processing",
                            "Shipped",
                            "Delivered",
                          ].map((label, idx) => {
                            const statusIndex =
                              {
                                pending: 0,
                                processing: 1,
                                shipped: 2,
                                delivered: 3,
                              }[order.status.toLowerCase()] ?? 0;

                            return (
                              <div
                                key={`${order._id}-step-${idx}`}
                                className="timeline-step"
                              >
                                <div
                                  className={`timeline-dot ${
                                    idx <= statusIndex ? "active" : ""
                                  }`}
                                />
                                <small className="timeline-label">
                                  {label}
                                </small>
                              </div>
                            );
                          })}
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default MyOrders;
