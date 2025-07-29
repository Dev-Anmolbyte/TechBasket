import React, { useState } from "react";
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
  FaDollarSign,
  FaBox,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../App.jsx";
import { products as initialProducts } from "../data/products.js";

const AdminDashboard = () => {
  const { user, orders } = useAppContext();
  const navigate = useNavigate();


  const [products, setProducts] = useState(initialProducts);
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

  // Check admin access
  if (!user || user.role !== "admin") {
    return (
      <Container className="py-5 text-center">
        <h2>Access Denied</h2>
        <p>You need administrator privileges to access this page.</p>
        <Button variant="primary" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </Container>
    );
  }

  // Calculate stats
  const totalRevenue = orders.reduce((total, order) => {
    const orderTotal =
      order.totals?.total ||
      order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return total + orderTotal;
  }, 0);

  const totalCustomers = new Set(
    orders.map((order) => order.userId || order.id)
  ).size;
  const totalOrders = orders.length;
  const totalProducts = products.length;

  const handleProductSubmit = (e) => {
    e.preventDefault();

    if (editingProduct) {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? {
                ...editingProduct,
                ...productForm,
                price: parseFloat(productForm.price),
              }
            : p
        )
      );
    } else {
      const newProduct = {
        id: Math.max(...products.map((p) => p.id)) + 1,
        ...productForm,
        price: parseFloat(productForm.price),
        rating: 5,
        reviews: 0,
        specifications: {},
      };
      setProducts([...products, newProduct]);
    }

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
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      brand: product.brand,
      category: product.category,
      price: product.price.toString(),
      description: product.description,
      image: product.image,
      inStock: product.inStock,
    });
    setShowProductModal(true);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== productId));
    }
  };

  const getOrderStatusColor = (status) => {
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

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1>Admin Dashboard</h1>
          <p className="text-muted">Manage your TechBasket store</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center admin-stat-card">
            <Card.Body>
              <FaDollarSign size={32} className="text-success mb-2" />
              <h3 className="mb-0">₹{totalRevenue.toFixed(2)}</h3>
              <p className="text-muted mb-0">Total Revenue</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center admin-stat-card">
            <Card.Body>
              <FaShoppingCart size={32} className="text-primary mb-2" />
              <h3 className="mb-0">{totalOrders}</h3>
              <p className="text-muted mb-0">Total Orders</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center admin-stat-card">
            <Card.Body>
              <FaUsers size={32} className="text-info mb-2" />
              <h3 className="mb-0">{totalCustomers}</h3>
              <p className="text-muted mb-0">Customers</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center admin-stat-card">
            <Card.Body>
              <FaBox size={32} className="text-warning mb-2" />
              <h3 className="mb-0">{totalProducts}</h3>
              <p className="text-muted mb-0">Products</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Main Content Tabs */}
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
                    {orders.slice(0, 10).map((order) => {
                      const orderTotal =
                        order.totals?.total ||
                        order.items.reduce(
                          (sum, item) => sum + item.price * item.quantity,
                          0
                        );

                      return (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>
                            {order.billingInfo
                              ? `${order.billingInfo.firstName} ${order.billingInfo.lastName}`
                              : "Customer"}
                          </td>
                          <td>
                            {new Date(order.orderDate).toLocaleDateString()}
                          </td>
                          <td>{order.items.length}</td>
                          <td className="fw-bold">${orderTotal.toFixed(2)}</td>
                          <td>
                            <span
                              className={`badge bg-${getOrderStatusColor(
                                order.status
                              )}`}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </span>
                          </td>
                          <td>
                            <Button variant="outline-primary" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
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
                    <tr key={product.id}>
                      <td>
                        <img
                          src={product.image}
                          alt={product.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                          className="rounded"
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.brand}</td>
                      <td>{product.category}</td>
                      <td className="fw-bold">${product.price}</td>
                      <td>
                        <span
                          className={`badge bg-${
                            product.inStock ? "success" : "danger"
                          }`}
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td>
                        <Button
                          variant="outline-primary"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEditProduct(product)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
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

      {/* Product Modal */}
      <Modal
        show={showProductModal}
        onHide={() => setShowProductModal(false)}
        size="lg"
      >
        <Form onSubmit={handleProductSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingProduct ? "Edit Product" : "Add New Product"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
              onClick={() => setShowProductModal(false)}
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
