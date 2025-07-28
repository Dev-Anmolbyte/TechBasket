import React from 'react'
import { Container, Row, Col, Card, Button, Form, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash, FaMinus, FaPlus, FaShoppingBag, FaArrowLeft } from 'react-icons/fa'
import { useAppContext } from '../App.jsx'

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, user } = useAppContext()
  const navigate = useNavigate()

  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const tax = subtotal * 0.08 // 8% tax
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + tax + shipping

  const handleQuantityChange = (productId, newQuantity) => {
    updateCartQuantity(productId, newQuantity)
  }

  const handleRemoveItem = (productId) => {
    removeFromCart(productId)
  }

  const handleCheckout = () => {
    if (!user) {
      navigate('/login')
      return
    }
    navigate('/checkout')
  }

  if (cart.length === 0) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center text-center">
          <Col md={6}>
            <FaShoppingBag size={64} className="text-muted mb-4" />
            <h2>Your Cart is Empty</h2>
            <p className="text-muted mb-4">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/shopping">
              <Button variant="primary" size="lg">
                Start Shopping
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <Row className="mb-3">
        <Col>
          <Button 
            variant="link" 
            className="p-0 mb-2"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="me-2" />
            Continue Shopping
          </Button>
          <h1>Shopping Cart ({cart.length} items)</h1>
        </Col>
      </Row>

      <Row>
        {/* Cart Items */}
        <Col lg={8}>
          {cart.map(item => (
            <Card key={item.id} className="cart-item">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={2}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ height: '80px', objectFit: 'cover', width: '100%' }}
                    />
                  </Col>
                  <Col md={4}>
                    <h6 className="mb-1">{item.name}</h6>
                    <p className="text-muted small mb-0">{item.brand} • {item.category}</p>
                    {!item.inStock && (
                      <Alert variant="warning" className="py-1 px-2 mt-1 mb-0 small">
                        Out of Stock
                      </Alert>
                    )}
                  </Col>
                  <Col md={2}>
                    <div className="d-flex align-items-center">
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus />
                      </Button>
                      <Form.Control
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                        className="mx-2 text-center"
                        style={{ width: '60px' }}
                      />
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        <FaPlus />
                      </Button>
                    </div>
                  </Col>
                  <Col md={2}>
                    <div className="text-center">
                      <div className="fw-bold">${(item.price * item.quantity).toFixed(2)}</div>
                      <div className="small text-muted">${item.price} each</div>
                    </div>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* Order Summary */}
        <Col lg={4}>
          <Card className="cart-summary position-sticky" style={{ top: '100px' }}>
            <Card.Header>
              <h5 className="mb-0">Order Summary</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({cart.length} items):</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-success">FREE</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong className="price-tag">${total.toFixed(2)}</strong>
              </div>

              {shipping > 0 && (
                <Alert variant="info" className="py-2 px-3 mb-3 small">
                  Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                </Alert>
              )}

              <Button 
                variant="primary" 
                size="lg" 
                className="w-100 mb-3"
                onClick={handleCheckout}
              >
                {user ? 'Proceed to Checkout' : 'Login to Checkout'}
              </Button>

              <Button 
                variant="outline-primary" 
                className="w-100"
                as={Link}
                to="/shopping"
              >
                Continue Shopping
              </Button>
            </Card.Body>
          </Card>

          {/* Security Info */}
          <Card className="mt-3 border-success">
            <Card.Body className="text-center py-3">
              <h6 className="text-success mb-2">Secure Checkout</h6>
              <small className="text-muted">
                Your payment information is encrypted and secure
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Cart