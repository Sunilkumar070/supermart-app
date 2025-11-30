const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get all products with filters
router.get('/', async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, isQuickCommerce, sort } = req.query;
    let query = { isActive: true };

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (isQuickCommerce) query.isQuickCommerce = isQuickCommerce === 'true';

    let sortOption = {};
    if (sort === 'price_low') sortOption.price = 1;
    else if (sort === 'price_high') sortOption.price = -1;
    else if (sort === 'rating') sortOption['ratings.average'] = -1;
    else sortOption.createdAt = -1;

    const products = await Product.find(query).sort(sortOption).limit(50);
    res.json({ products, count: products.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('reviews.user', 'name');
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;