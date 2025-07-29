import React from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingBag, FaEye, FaDownload } from "react-icons/fa";
import { useAppContext } from "../App.jsx";

const OrderHistory = () => {
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1>Order History</h1>
          <p className="text-muted">Track and manage your orders</p>
        </Col>
      </Row>

      {orders.length === 0 ? (
        <Row className="justify-content-center text-center">
          <Col md={6}>
            <FaShoppingBag size={64} className="text-muted mb-4" />
            <h3>No Orders Yet</h3>
            <p className="text-muted mb-4">
              You haven't placed any orders yet. Start shopping to see your
              order history here.
            </p>
            <Link to="/shopping">
              <Button variant="primary" size="lg">
                Start Shopping
              </Button>
            </Link>
          </Col>
        </Row>
      ) : (
        <Row>
          {orders.map((order) => {
            const orderTotal =
              order.totals?.total ||
              order.items.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              );

            return (
              <Col key={order.id} className="mb-4">
                <Card>
                  <Card.Header>
                    <Row className="align-items-center">
                      <Col md={3}>
                        <div>
                          <strong>Order #{order.id}</strong>
                        </div>
                        <small className="text-muted">
                          Placed on {formatDate(order.orderDate)}
                        </small>
                      </Col>
                      <Col md={2}>
                        <Badge
                          bg={getStatusColor(order.status)}
                          className="order-status"
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </Badge>
                      </Col>
                      <Col md={2}>
                        <div className="fw-bold price-tag">
                          ${orderTotal.toFixed(2)}
                        </div>
                      </Col>
                      <Col md={2}>
                        <small className="text-muted">
                          {order.items.length} item
                          {order.items.length !== 1 ? "s" : ""}
                        </small>
                      </Col>
                      <Col md={3} className="text-end">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                        >
                          <FaEye className="me-1" />
                          View Details
                        </Button>
                        <Button variant="outline-secondary" size="sm">
                          <FaDownload className="me-1" />
                          Invoice
                        </Button>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={8}>
                        <h6>Items Ordered:</h6>
                        <div className="mb-3">
                          {order.items.slice(0, 3).map((item) => (
                            <div
                              key={item.id}
                              className="d-flex align-items-center mb-2"
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="me-3"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                }}
                              />
                              <div className="flex-grow-1">
                                <div className="small fw-bold">{item.name}</div>
                                <div className="small text-muted">
                                  Qty: {item.quantity} × ${item.price}
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
                      </Col>
                      <Col md={4}>
                        <h6>Delivery Information:</h6>
                        {order.billingInfo && (
                          <div className="small">
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
                            <strong>Tracking Number:</strong>
                            <div className="font-monospace">
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

                    {/* Order Status Timeline */}
                    <Row className="mt-3">
                      <Col>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="d-flex align-items-center">
                            <div
                              className={`bg-${
                                order.status === "pending"
                                  ? "warning"
                                  : "success"
                              } rounded-circle`}
                              style={{ width: "12px", height: "12px" }}
                            ></div>
                            <span className="ms-2 small">Order Placed</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <div
                              className={`bg-${
                                ["processing", "shipped", "delivered"].includes(
                                  order.status
                                )
                                  ? "success"
                                  : "light"
                              } rounded-circle`}
                              style={{ width: "12px", height: "12px" }}
                            ></div>
                            <span className="ms-2 small">Processing</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <div
                              className={`bg-${
                                ["shipped", "delivered"].includes(order.status)
                                  ? "success"
                                  : "light"
                              } rounded-circle`}
                              style={{ width: "12px", height: "12px" }}
                            ></div>
                            <span className="ms-2 small">Shipped</span>
                          </div>
                          <div className="d-flex align-items-center">
                            <div
                              className={`bg-${
                                order.status === "delivered"
                                  ? "success"
                                  : "light"
                              } rounded-circle`}
                              style={{ width: "12px", height: "12px" }}
                            ></div>
                            <span className="ms-2 small">Delivered</span>
                          </div>
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

export default OrderHistory;
