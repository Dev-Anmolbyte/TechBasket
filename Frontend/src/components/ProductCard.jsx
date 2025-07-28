import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaStar } from 'react-icons/fa'
import { useAppContext } from '../App.jsx'

const ProductCard = ({ product }) => {
  const { addToCart } = useAppContext()

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product)
  }

  return (
    <Card className="h-100 product-card">
      <Card.Img 
        variant="top" 
        src={product.image} 
        style={{ height: '200px', objectFit: 'cover' }} 
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h6">{product.name}</Card.Title>
        <Card.Text className="text-muted small mb-2">
          {product.brand} • {product.category}
        </Card.Text>
        <div className="mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar 
              key={i} 
              className={i < product.rating ? 'text-warning' : 'text-muted'} 
              size={12}
            />
          ))}
          <small className="ms-2 text-muted">({product.reviews} reviews)</small>
        </div>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="price-tag">${product.price}</span>
            {product.inStock ? (
              <span className="badge bg-success">In Stock</span>
            ) : (
              <span className="badge bg-danger">Out of Stock</span>
            )}
          </div>
          <div className="d-grid gap-2">
            <Link to={`/product/${product.id}`}>
              <Button variant="outline-primary" size="sm" className="w-100">
                View Details
              </Button>
            </Link>
            <Button 
              variant="primary" 
              size="sm"
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              <FaShoppingCart className="me-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ProductCard