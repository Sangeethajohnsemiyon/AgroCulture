const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

// @GET /api/marketplace/products (public)
router.get('/products', async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, isOrganic, sort, page = 1, limit = 12 } = req.query;
    const query = { isAvailable: true };
    if (category) query.category = category;
    if (isOrganic === 'true') query.isOrganic = true;
    if (minPrice || maxPrice) query.price = { ...(minPrice && { $gte: Number(minPrice) }), ...(maxPrice && { $lte: Number(maxPrice) }) };
    if (search) query.$text = { $search: search };

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    else if (sort === 'price_desc') sortOption = { price: -1 };
    else if (sort === 'rating') sortOption = { rating: -1 };
    else if (sort === 'popular') sortOption = { soldCount: -1 };

    const skip = (Number(page) - 1) * Number(limit);
    const [products, total] = await Promise.all([
      Product.find(query).populate('farmer', 'name farmName').sort(sortOption).skip(skip).limit(Number(limit)),
      Product.countDocuments(query)
    ]);
    res.json({ success: true, products, total, pages: Math.ceil(total / Number(limit)), currentPage: Number(page) });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @GET /api/marketplace/products/featured (public)
router.get('/products/featured', async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true, isAvailable: true }).populate('farmer', 'name farmName').limit(8);
    res.json({ success: true, products });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @GET /api/marketplace/products/:id (public)
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('farmer', 'name farmName phone address');
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    product.views += 1;
    await product.save();
    res.json({ success: true, product });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @POST /api/marketplace/products (farmer only)
router.post('/products', protect, authorize('farmer', 'admin'), async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, farmer: req.user._id });
    res.status(201).json({ success: true, message: 'Product listed successfully', product });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @PUT /api/marketplace/products/:id (farmer only)
router.put('/products/:id', protect, authorize('farmer', 'admin'), async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, farmer: req.user._id },
      req.body, { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    res.json({ success: true, message: 'Product updated', product });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @DELETE /api/marketplace/products/:id
router.delete('/products/:id', protect, authorize('farmer', 'admin'), async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.params.id, farmer: req.user._id });
    res.json({ success: true, message: 'Product deleted' });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @POST /api/marketplace/products/:id/review
router.post('/products/:id/review', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
    const existingReview = product.reviews.find(r => r.user.toString() === req.user._id.toString());
    if (existingReview) return res.status(400).json({ success: false, message: 'Already reviewed' });
    product.reviews.push({ user: req.user._id, name: req.user.name, rating, comment });
    product.numReviews = product.reviews.length;
    product.rating = product.reviews.reduce((a, r) => a + r.rating, 0) / product.reviews.length;
    await product.save();
    res.status(201).json({ success: true, message: 'Review added' });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @GET /api/marketplace/categories
router.get('/categories', async (req, res) => {
  const categories = ['vegetables', 'fruits', 'grains', 'pulses', 'dairy', 'spices', 'herbs', 'organic', 'other'];
  res.json({ success: true, categories });
});

// @GET /api/marketplace/farmer-products (farmer's own)
router.get('/farmer-products', protect, authorize('farmer'), async (req, res) => {
  try {
    const products = await Product.find({ farmer: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

module.exports = router;
