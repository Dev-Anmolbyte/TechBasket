import React from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaEye, FaDownload } from "react-icons/fa";
import { useAppContext } from "../App.jsx";

const MyOrders = () => {
  const USD_TO_INR = 87.7;
  const { orders, user } = useAppContext();

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

  return (
    <Container className="my-contner py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold">My Orders</h1>
          <p className="text-muted">Track and manage your purchases</p>
        </Col>
      </Row>

      {orders.length === 0 ? (
        <Row className="justify-content-center text-center">
          <Col md={6}>
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
              <Col md={12} key={order.id}>
                <Card className="shadow-sm rounded-4 border-0 hover-shadow">
                  <Card.Header className="bg-light border-0">
                    <Row className="align-items-center">
                      <Col md={3}>
                        <div className="fw-semibold">Order #{order.id}</div>
                        <small className="text-muted">
                          Placed on {formatDate(order.orderDate)}
                        </small>
                      </Col>
                      <Col md={2}>
                        <Badge
                          bg={getStatusColor(order.status)}
                          className="text-capitalize px-3 py-2"
                        >
                          {order.status}
                        </Badge>
                      </Col>
                      <Col md={2}>
                        <div className="fw-bold text-primary">
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 0,
                          }).format(orderTotal * USD_TO_INR)}
                        </div>
                      </Col>
                      <Col md={2}>
                        <small className="text-muted">
                          {order.items.length} item
                          {order.items.length !== 1 ? "s" : ""}
                        </small>
                      </Col>
                      <Col
                        md={3}
                        className="text-end d-flex justify-content-end align-items-center gap-2 flex-wrap"
                      >
                        <Button variant="outline-primary" size="sm">
                          <FaEye className="me-1" />
                          View
                        </Button>
                        <Button variant="outline-secondary" size="sm">
                          <FaDownload className="me-1" />
                          Invoice
                        </Button>
                        {["pending", "processing", "shipped"].includes(
                          order.status.toLowerCase()
                        ) && (
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => {
                              // code adding //
                              alert(`Cancel order #${order.id}`);
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Card.Header>

                  <Card.Body className="p-4">
                    <Row className="g-4">
                      <Col md={8}>
                        <h6 className="fw-semibold">Items Ordered:</h6>
                        <div className="mb-3">
                          {order.items.slice(0, 3).map((item) => (
                            <div
                              key={item.id}
                              className="d-flex align-items-start mb-2"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="me-3"
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  objectFit: "cover",
                                  borderRadius: "6px",
                                }}
                              />
                              <div className="flex-grow-1 small">
                                <div className="fw-semibold">{item.name}</div>
                                <div className="text-muted">
                                  Qty: {item.quantity}
                                </div>
                              </div>
                            </div>
                          ))}
                          {order.items.length > 3 && (
                            <small className="text-muted">
                              and {order.items.length - 3} more item(s)
                            </small>
                          )}
                        </div>

                        <h6 className="fw-semibold mt-3">Order Summary:</h6>
                        <div className="text-muted small">
                          <div>
                            <strong>Qty:</strong>{" "}
                            {order.items.reduce(
                              (sum, item) => sum + item.quantity,
                              0
                            )}
                          </div>
                          <div>
                            <strong>Price:</strong> ₹
                            {Math.round(
                              order.items.reduce(
                                (sum, item) => sum + item.price * item.quantity,
                                0
                              ) * USD_TO_INR
                            )}
                          </div>
                          <div>
                            <strong>Tax:</strong> ₹
                            {Math.round(tax * USD_TO_INR)}
                          </div>
                          <div>
                            <strong>Shipping:</strong> ₹
                            {Math.round(shipping * USD_TO_INR)}
                          </div>
                          <div className="fw-bold text-dark mt-2">
                            <strong>Total:</strong> ₹
                            {Math.round(orderTotal * USD_TO_INR)}
                          </div>
                        </div>
                      </Col>

                      <Col md={4}>
                        <h6 className="fw-semibold">Delivery Information:</h6>
                        {order.billingInfo && (
                          <div className="small bg-light p-3 rounded-3">
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

                        {order.status === "shipped" && (
                          <div className="mt-3">
                            <strong>Tracking:</strong>
                            <div className="font-monospace small">
                              1Z999AA1234567890
                            </div>
                          </div>
                        )}

                        {order.status === "delivered" && (
                          <div className="mt-3 text-success">
                            <strong>✓ Delivered</strong>
                            <div className="small">
                              {formatDate(
                                new Date(
                                  Date.parse(order.orderDate) +
                                    7 * 24 * 60 * 60 * 1000
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </Col>
                    </Row>

                    {/* Timeline */}
                    <Row className="mt-4">
                      <Col>
                        <div className="d-flex justify-content-between px-2">
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
                                key={idx}
                                className="d-flex flex-column align-items-center"
                              >
                                <div
                                  className={`rounded-circle ${
                                    idx <= statusIndex
                                      ? "bg-success"
                                      : "bg-light border"
                                  }`}
                                  style={{
                                    width: "14px",
                                    height: "14px",
                                  }}
                                />
                                <small className="mt-1 text-muted text-center">
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
