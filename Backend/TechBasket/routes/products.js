const express = require('express');
const router = express.Router();
const Product = require('../Model/product');

// GET /api/products
// Query params: search, category, brand, minPrice, maxPrice, inStock, sortBy, page, limit
router.post('/add', async (req, res) => {
  try {
    const product = new Product(req.body); // assuming the body matches schema
    await product.save();
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { search, category, brand, minPrice, maxPrice, inStock, sortBy, page = 1, limit = 20 } = req.query;
    const query = {};

    // Filter: search (name, brand, category)
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }
    // Filter: category
    if (category && category !== 'All Categories') query.category = category;
    // Filter: brand
    if (brand && brand !== 'All Brands') query.brand = brand;
    // Filter: price
    if (minPrice) query.price = { ...(query.price || {}), $gte: parseFloat(minPrice) };
    if (maxPrice) query.price = { ...(query.price || {}), $lte: parseFloat(maxPrice) };
    // Filter: inStock
    if (inStock === 'true') query.inStock = true;

    // Pagination and sorting
    const sortOptions = {};
    if (sortBy === 'price-low') sortOptions.price = 1;
    else if (sortBy === 'price-high') sortOptions.price = -1;
    else if (sortBy === 'rating') sortOptions.rating = -1;
    else sortOptions.name = 1;

    const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    // Query DB
    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(parseInt(limit, 10)),
      Product.countDocuments(query)
    ]);

    res.json({
      success: true,
      total,
      page: parseInt(page, 10),
      products
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching products', error: err.message });
  }
});

// GET /api/products/:id (Product details by MongoDB _id)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Error fetching product', error: err.message });
  }
});

module.exports = router;
