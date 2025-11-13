import React, { useState, useMemo, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  Spinner,
} from "react-bootstrap";
import { FaSearch, FaFilter } from "react-icons/fa";
import ProductCard from "../components/ProductCard.jsx";
import axios from "axios";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useRef } from "react";

import { cardVariants, containerVariants } from "../../src/data/variant.js";

const Shopping = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [sortBy, setSortBy] = useState("name");
  const [inStockOnly, setInStockOnly] = useState(false);
  const headingRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    gsap.fromTo(
      headingRef.current,
      {
        textShadow: "0px 0px 0px #00f",
        scale: 0.9,
      },
      {
        textShadow: "0px 0px 20px #00f, 0px 0px 30px #0ff",
        scale: 1.05,
        duration: 1,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      }
    );

    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);

        const allCategories = [
          "All Categories",
          ...new Set(res.data.map((p) => p.category).filter(Boolean)),
        ];
        const allBrands = [
          "All Brands",
          ...new Set(res.data.map((p) => p.brand).filter(Boolean)),
        ];
        setCategories(allCategories);
        setBrands(allBrands);
      } catch (err) {
        console.error("Failed to fetch products:", err.message);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const name = product.name || "";
      const brand = product.brand || "";
      const category = product.category || "";

      const matchesSearch =
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All Categories" || category === selectedCategory;
      const matchesBrand =
        selectedBrand === "All Brands" || brand === selectedBrand;
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
    products,
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Container className="my-contner py-5" style={{ minHeight: "100vh" }}>
        <Row className="mb-4">
          <Col>
            <h2 className="fw-bold" ref={headingRef}>
              🖥 PC Components
            </h2>
            <p className="text-muted">Find the perfect parts for your build</p>
          </Col>
        </Row>

        <Row>
          {/* Horizontal Filters Section */}
          <Col lg={12} className="mb-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-sm border-0 login-card">
                <Card.Body>
                  <Form className="d-flex flex-wrap gap-3 align-items-end">
                    {/* Search Field */}
                    <div style={{ flex: "1 1 200px" }}>
                      <Form.Label className="form-label">Search</Form.Label>
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
                    </div>

                    {/* Category Select */}
                    <div>
                      <Form.Label className="form-label">Category</Form.Label>
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
                    </div>

                    {/* Brand Select */}
                    <div>
                      <Form.Label className="form-label">Brand</Form.Label>
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
                    </div>

                    {/* Price Range */}
                    <div>
                      <Form.Label className="form-label">
                        Price Range
                      </Form.Label>
                      <div className="d-flex gap-2">
                        <Form.Control
                          type="number"
                          placeholder="Min"
                          size="sm"
                          style={{ width: "80px" }}
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
                          style={{ width: "80px" }}
                          value={priceRange.max}
                          onChange={(e) =>
                            setPriceRange((prev) => ({
                              ...prev,
                              max: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>

                    {/* Sort By */}
                    <div>
                      <Form.Label className="form-label">Sort By</Form.Label>
                      <Form.Select
                        id="sort-by"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="name">Name</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Rating</option>
                      </Form.Select>
                    </div>

                    {/* In Stock Only Checkbox */}
                    <div className="d-flex align-items-center">
                      <Form.Check
                        type="checkbox"
                        label="In Stock Only"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                        className="form-check-neon"
                      />
                    </div>

                    {/* Clear Filters Button */}
                    <Button
                      variant="outline-secondary"
                      onClick={clearFilters}
                      className="d-flex align-items-center"
                    >
                      <FaFilter className="me-2" />
                      Clear
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
        <hr />

        {/* Products Section */}
        <Row className="mt-4">
          <Col lg={12}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Row className="mb-3 justify-content-between align-items-center">
                <Col xs="auto">
                  <p className="text-muted mb-0">
                    Showing {filteredProducts.length} of {products.length}{" "}
                    products
                  </p>
                </Col>
              </Row>

              {filteredProducts.length > 0 ? (
                <motion.div
                  className="row"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product._id || product.id}
                      className="col-lg-3 col-md-4 col-sm-6 mb-4"

                      variants={cardVariants}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <Card className="text-center py-5 border-0 shadow-sm login-card">
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
            </motion.div>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default Shopping;