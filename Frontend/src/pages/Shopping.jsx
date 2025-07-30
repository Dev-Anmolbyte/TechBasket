import React, { useState, useMemo } from "react";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { FaSearch, FaFilter } from "react-icons/fa";
import ProductCard from "../components/ProductCard.jsx";
import { products, categories, brands } from "../data/products.js";

const Shopping = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("name");
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Categories" ||
        product.category === selectedCategory;
      const matchesBrand =
        selectedBrand === "All Brands" || product.brand === selectedBrand;
      const matchesStock = !inStockOnly || product.inStock;

      const matchesPrice =
        (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
        (!priceRange.max || product.price <= parseFloat(priceRange.max));

      return (
        matchesSearch &&
        matchesCategory &&
        matchesBrand &&
        matchesStock &&
        matchesPrice
      );
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [
    searchTerm,
    selectedCategory,
    selectedBrand,
    priceRange,
    sortBy,
    inStockOnly,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All Categories");
    setSelectedBrand("All Brands");
    setPriceRange({ min: "", max: "" });
    setSortBy("name");
    setInStockOnly(false);
  };

  return (
    <Container className="shopping-container py-3">
      <Row className="mb-4">
        <Col>
          <h2 className="fw-bold">🖥 PC Components</h2>
          <p className="text-muted">Find the perfect parts for your build</p>
        </Col>
      </Row>

      {/* Filters Section */}
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body>
          <Row className="g-3 align-items-end">
            <Col md={3}>
              <Form.Label>Search</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <FaSearch />
                </span>
                <Form.Control
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </Col>

            <Col md={2}>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group>
                <Form.Label>Brand</Form.Label>
                <Form.Select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                >
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group>
                <Form.Label>Sort By</Form.Label>
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={2}>
              <Form.Group>
                <Form.Label>Price Range</Form.Label>
                <div className="d-flex gap-2">
                  <Form.Control
                    type="number"
                    placeholder="Min"
                    size="sm"
                    value={priceRange.min}
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        min: e.target.value,
                      }))
                    }
                  />
                  <Form.Control
                    type="number"
                    placeholder="Max"
                    size="sm"
                    value={priceRange.max}
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        max: e.target.value,
                      }))
                    }
                  />
                </div>
              </Form.Group>
            </Col>

            <Col md={1}>
              <Form.Check
                type="checkbox"
                label="In Stock"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="mb-2"
              />
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={clearFilters}
                className="w-100"
              >
                Clear
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Results Summary */}
      <Row className="mb-3">
        <Col>
          <p className="text-muted mb-0">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </Col>
      </Row>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product.id} lg={3} md={4} sm={6} className="mb-4">
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <Card className="text-center py-5 border-0 shadow-sm">
          <Card.Body>
            <FaFilter size={48} className="text-muted mb-3" />
            <h4>No products found</h4>
            <p className="text-muted">
              Try adjusting your filters or search term
            </p>
            <Button variant="primary" onClick={clearFilters}>
              Clear All Filters
            </Button>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default Shopping;
