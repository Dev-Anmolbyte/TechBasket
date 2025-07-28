import React from 'react'
import { Navbar as BsNavbar, Nav, Container, Badge, Dropdown, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaUser, FaSignOutAlt, FaHistory, FaCog } from 'react-icons/fa'
import { useAppContext } from '../App.jsx'

const Navbar = () => {
  const { user, cart, logout } = useAppContext()
  const navigate = useNavigate()

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <BsNavbar bg="primary" variant="dark" expand="lg" sticky="top" className="custom-navbar">
      <Container>
        <BsNavbar.Brand as={Link} to="/" className="fw-bold">
          TechBasket
        </BsNavbar.Brand>
        
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/shopping">Shop</Nav.Link>
            <Nav.Link as={Link} to="/">Contact US</Nav.Link>
          </Nav>
          
          <Nav className="align-items-center">
            {/* Cart */}
            <Nav.Link as={Link} to="/cart" className="position-relative me-3">
              <FaShoppingCart size={20} />
              {cartItemCount > 0 && (
                <Badge 
                  bg="danger" 
                  pill 
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem' }}
                >
                  {cartItemCount}
                </Badge>
              )}
            </Nav.Link>
            
            {/* User Menu */}
            {user ? (
              <Dropdown align="end">
                <Dropdown.Toggle 
                  as={Button}
                  variant="outline-light" 
                  id="dropdown-user"
                  className="d-flex align-items-center"
                >
                  <FaUser className="me-2" />
                  {user.name}
                </Dropdown.Toggle>
                
                <Dropdown.Menu>
                  <Dropdown.Header>
                    <div className="small">{user.email}</div>
                    <Badge bg={user.role === 'admin' ? 'danger' : 'secondary'} className="mt-1">
                      {user.role === 'admin' ? 'Administrator' : 'Customer'}
                    </Badge>
                  </Dropdown.Header>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/orders">
                    <FaHistory className="me-2" />
                    Order History
                  </Dropdown.Item>
                  {user.role === 'admin' && (
                    <Dropdown.Item as={Link} to="/admin">
                      <FaCog className="me-2" />
                      Admin Dashboard
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <div>
                <Button 
                  as={Link} 
                  to="/login" 
                  variant="outline-light" 
                  className="me-2"
                >
                  Login
                </Button>
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="light"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  )
}

export default Navbar