import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
  Modal,
  Alert,
  Tab,
  Tabs,
} from "react-bootstrap";
import {
  FaUsers,
  FaShoppingCart,
  FaRupeeSign,
  FaBox,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../App.jsx";
import axios from "axios";

const USD_TO_INR = 87.7;
const API_BASE_URL = "http://localhost:5000/api/admin";

const AdminDashboard = () => {
  const { user, setUser } = useAppContext(); // if you have setUser for logout, else ignore
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    description: "",
    image:
      "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
    inStock: true,
  });

  const calculateOrderTotal = (order) => {
    return (order.items || []).reduce((sum, item) => {
      const price = Number(item.price) || Number(item.product?.price) || 0;
      return sum + price * Number(item.quantity || 0);
    }, 0);
  };

  const tax = calculateOrderTotal * 0.08;
  const shipping = calculateOrderTotal > 50 ? 0 : 9.99;

  // Build axios config with Authorization header if token exists
  const makeConfig = useCallback(() => {
    const token = user?.token || localStorage.getItem("token");
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    };
  }, [user]);

  // Generic 401 handler
  const handleAuthError = (err) => {
    if (err?.response?.status === 401) {
      // optional: clear localStorage and context user
      localStorage.removeItem("token");
      if (typeof setUser === "function") setUser(null);
      navigate("/login");
    }
  };

  // Single fetch function for all admin data (uses auth header)
  const fetchAdminData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const config = makeConfig();
      const [productsRes, ordersRes, usersRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/products`, config),
        axios.get(`${API_BASE_URL}/orders`, config),
        axios.get(`${API_BASE_URL}/users`, config),
      ]);
      setProducts(productsRes.data || []);
      setOrders(ordersRes.data || []);
      setCustomers(usersRes.data || []);
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
      handleAuthError(err);
      setError(
        err?.response?.data?.message ||
          "Failed to fetch data from the backend. Please check your network and try again."
      );
    } finally {
      setLoading(false);
    }
  }, [makeConfig, navigate]);

  // Run on mount if user is admin; otherwise redirect to login
  useEffect(() => {
    if (!user) {
      // If no user in context try token in localStorage (optional flow)
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
    }

    if (user && user.role !== "admin") {
      // Not admin -> redirect
      navigate("/");
      return;
    }

    // fetch admin data
    fetchAdminData();
  }, [user, fetchAdminData, navigate]);

  // Derived stats
  const totalRevenue = orders.reduce((total, order) => {
    return total + calculateOrderTotal(order);
  }, 0);

  const totalCustomers = customers.length;
  const totalOrders = orders.length;
  const totalProducts = products.length;

  // Create or update product
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const config = makeConfig();
      const payload = { ...productForm, price: parseFloat(productForm.price) };

      if (editingProduct && (editingProduct._id || editingProduct.id)) {
        const id = editingProduct._id || editingProduct.id;
        await axios.put(`${API_BASE_URL}/products/${id}`, payload, config);
      } else {
        await axios.post(`${API_BASE_URL}/products`, payload, config);
      }

      // refresh products
      await fetchAdminData();
      setShowProductModal(false);
      setEditingProduct(null);
      setProductForm({
        name: "",
        brand: "",
        category: "",
        price: "",
        description: "",
        image:
          "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
        inStock: true,
      });
    } catch (err) {
      console.error("Failed to save product:", err);
      handleAuthError(err);
      setError(
        err?.response?.data?.message || "Failed to save product. Try again."
      );
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name || "",
      brand: product.brand || "",
      category: product.category || "",
      price: (product.price ?? "").toString(),
      description: product.description || "",
      image: product.image || "",
      inStock: !!product.inStock,
    });
    setShowProductModal(true);
  };

  const handleDeleteProduct = async (productIdOrObj) => {
    const id = productIdOrObj._id || productIdOrObj.id || productIdOrObj;
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      const config = makeConfig();
      await axios.delete(`${API_BASE_URL}/products/${id}`, config);
      // remove locally for quick UI update
      setProducts((prev) => prev.filter((p) => (p._id || p.id) !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
      handleAuthError(err);
      setError(
        err?.response?.data?.message || "Failed to delete product. Try again."
      );
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status?.toLowerCase()) {
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

  if (loading) {
    return <Container className="py-5 text-center">Loading...</Container>;
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <Container fluid className="my-admin py-4">
      <Row className="mb-4">
        <Col>
          <h1>Admin Dashboard</h1>
          <p className="text-muted">Manage your TechBasket store</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center admin-stat-card bg-gradient-revenue">
            <Card.Body>
              <FaRupeeSign size={32} className="mb-2" />
              <h3 className="mb-0">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  maximumFractionDigits: 0,
                }).format(totalRevenue * USD_TO_INR)}
              </h3>
              <p className="mb-0">Total Revenue</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center admin-stat-card bg-gradient-orders">
            <Card.Body>
              <FaShoppingCart size={32} className="mb-2" />
              <h3 className="mb-0">{totalOrders}</h3>
              <p className="mb-0">Total Orders</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center admin-stat-card bg-gradient-customers">
            <Card.Body>
              <FaUsers size={32} className="mb-2" />
              <h3 className="mb-0">{totalCustomers}</h3>
              <p className="mb-0">Customers</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center admin-stat-card bg-gradient-products">
            <Card.Body>
              <FaBox size={32} className="mb-2" />
              <h3 className="mb-0">{totalProducts}</h3>
              <p className="mb-0">Products</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Tabs defaultActiveKey="orders" className="mb-3">
        <Tab eventKey="orders" title="Orders">
          <Card>
            <Card.Header>
              <h5 className="mb-0">Recent Orders</h5>
            </Card.Header>
            <Card.Body>
              {orders.length > 0 ? (
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>Order #</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id || order.id}>
                        <td>#{order._id || order.id}</td>
                        <td>
                          {order.user?.name || order.customerName || "Customer"}
                        </td>

                        <td>
                          {order.orderDate
                            ? new Date(order.orderDate).toLocaleDateString(
                                "en-GB"
                              )
                            : "-"}
                        </td>

                        <td>{order.items?.length || 0}</td>

                        <td className="fw-bold">
                          {new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 0,
                          }).format(
                            (calculateOrderTotal(order) +
                              calculateOrderTotal(order) * 0.08 +
                              (calculateOrderTotal(order) > 50 ? 0 : 9.99)) *
                              USD_TO_INR
                          )}
                        </td>

                        <td>
                          <span
                            className={`badge bg-${getOrderStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status
                              ? order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)
                              : "Unknown"}
                          </span>
                        </td>
                        <td>
                          <Button
                            variant="primary"
                            size="sm"
                            className="btn-view"
                          >
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted">No orders yet</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="products" title="Products">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Product Management</h5>
              <Button
                variant="primary"
                onClick={() => setShowProductModal(true)}
              >
                <FaPlus className="me-2" />
                Add Product
              </Button>
            </Card.Header>
            <Card.Body>
              <Table responsive striped hover>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id || product.id}>
                      <td>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="product-thumb"
                          style={{ width: 80, height: 60, objectFit: "cover" }}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.brand}</td>
                      <td>{product.category}</td>
                      <td className="fw-bold">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                          maximumFractionDigits: 0,
                        }).format((product.price || 0) * USD_TO_INR)}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            product.inStock ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2 table-action-btn"
                          onClick={() => handleEditProduct(product)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="table-action-btn"
                          onClick={() => handleDeleteProduct(product)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      <Modal
        show={showProductModal}
        onHide={() => {
          setShowProductModal(false);
          setEditingProduct(null);
          setProductForm({
            name: "",
            brand: "",
            category: "",
            price: "",
            description: "",
            image:
              "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=400&h=300&fit=crop",
            inStock: true,
          });
        }}
        size="lg"
      >
        <Form onSubmit={handleProductSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Product Name *</Form.Label>
                  <Form.Control
                    type="text"
                    value={productForm.name}
                    onChange={(e) =>
                      setProductForm({ ...productForm, name: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Brand *</Form.Label>
                  <Form.Control
                    type="text"
                    value={productForm.brand}
                    onChange={(e) =>
                      setProductForm({ ...productForm, brand: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category *</Form.Label>
                  <Form.Select
                    value={productForm.category}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        category: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Processors">Processors</option>
                    <option value="Graphics Cards">Graphics Cards</option>
                    <option value="Memory">Memory</option>
                    <option value="Storage">Storage</option>
                    <option value="Motherboards">Motherboards</option>
                    <option value="Power Supplies">Power Supplies</option>
                    <option value="Cooling">Cooling</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price *</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm({ ...productForm, price: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={productForm.description}
                onChange={(e) =>
                  setProductForm({
                    ...productForm,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                value={productForm.image}
                onChange={(e) =>
                  setProductForm({ ...productForm, image: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="In Stock"
                checked={productForm.inStock}
                onChange={(e) =>
                  setProductForm({ ...productForm, inStock: e.target.checked })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowProductModal(false);
                setEditingProduct(null);
              }}
            >
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingProduct ? "Update Product" : "Add Product"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;
