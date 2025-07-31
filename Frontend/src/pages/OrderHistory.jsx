import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Badge,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useAppContext } from "../App.jsx";
import { products } from "../data/products.js";

const USD_TO_INR = 83.5;

const OrderHistory = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    // Load orders from localStorage
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const userOrders = storedOrders.filter((order) => order.userId === user.id);
    setOrders(userOrders);
  }, [user, navigate]);

  return (
    <Container className="shopping-container pt-3 pb-5">
      <Row className="mb-3">
        <Col>
          <Button
            variant="outline-primary"
            className="rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 mb-3 shadow-sm border-1"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
            Back
          </Button>
          <h1>Order History</h1>
        </Col>
      </Row>

      {orders.length === 0 ? (
        <Alert variant="info">You haven't purchased anything yet.</Alert>
      ) : (
        orders.map((order, index) => (
          <Card key={index} className="mb-4 shadow-sm border-0 rounded-4">
            <Card.Header className="d-flex justify-content-between align-items-center bg-light">
              <div>
                <strong>Order ID:</strong>
              </div>
              <Badge bg="success" className="text-uppercase">
                {order.status || "Placed"}
              </Badge>
            </Card.Header>
            <Card.Body>
              <div className="mb-2 text-muted small">
                Placed on: {order.date || new Date().toLocaleDateString()}
              </div>
              {order.items.map((cartItem, i) => {
                const product = products.find((p) => p.id === cartItem.id);
                return (
                  <Row key={i} className="align-items-center mb-3">
                    <Col md={2} className="text-center">
                      <img
                        src={product?.image}
                        alt={product?.name}
                        className="img-fluid rounded"
                        style={{
                          height: "80px",
                          width: "80px",
                          objectFit: "cover",
                        }}
                      />
                    </Col>
                    <Col md={6}>
                      <h6 className="mb-1">{product?.name}</h6>
                      <p className="small text-muted mb-0">
                        Quantity: {cartItem.quantity}
                      </p>
                    </Col>
                    <Col md={4} className="text-end">
                      <div className="fw-bold text-primary">
                        ₹{" "}
                        {Math.round(
                          product?.price * cartItem.quantity * USD_TO_INR
                        ).toLocaleString("en-IN")}
                      </div>
                    </Col>
                  </Row>
                );
              })}
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold">Total Paid:</span>
                <span className="fw-bold text-success">
                  ₹{" "}
                  {Math.round(order.total * USD_TO_INR).toLocaleString("en-IN")}
                </span>
              </div>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default OrderHistory;
