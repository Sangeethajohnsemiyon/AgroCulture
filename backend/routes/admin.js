const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');

router.use(protect, authorize('admin'));

// @GET /api/admin/stats
router.get('/stats', async (req, res) => {
  try {
    const [totalUsers, totalProducts, totalOrders, farmers, buyers] = await Promise.all([
      User.countDocuments(), Product.countDocuments(), Order.countDocuments(),
      User.countDocuments({ role: 'farmer' }), User.countDocuments({ role: 'buyer' })
    ]);
    const revenue = await Order.aggregate([{ $match: { paymentStatus: 'paid' } }, { $group: { _id: null, total: { $sum: '$totalAmount' } } }]);
    res.json({ success: true, stats: { totalUsers, totalProducts, totalOrders, farmers, buyers, revenue: revenue[0]?.total || 0 } });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    const { role, page = 1, limit = 20, search } = req.query;
    const query = {};
    if (role) query.role = role;
    if (search) query.$or = [{ name: new RegExp(search, 'i') }, { email: new RegExp(search, 'i') }];
    const users = await User.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
    const total = await User.countDocuments(query);
    res.json({ success: true, users, total });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @PUT /api/admin/users/:id
router.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: 'User updated', user });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @DELETE /api/admin/users/:id
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted' });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @GET /api/admin/orders
router.get('/orders', async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = status ? { orderStatus: status } : {};
    const orders = await Order.find(query).populate('buyer', 'name email').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit));
    const total = await Order.countDocuments(query);
    res.json({ success: true, orders, total });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @PUT /api/admin/orders/:id/status
router.put('/orders/:id/status', async (req, res) => {
  try {
    const { status, message, location } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    order.orderStatus = status;
    order.deliveryTimeline.push({ status, message, location, timestamp: new Date() });
    await order.save();
    res.json({ success: true, message: 'Order status updated', order });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @GET /api/admin/products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find().populate('farmer', 'name email').sort({ createdAt: -1 });
    res.json({ success: true, products });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @PUT /api/admin/products/:id/feature
router.put('/products/:id/feature', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isFeatured: req.body.isFeatured }, { new: true });
    res.json({ success: true, product });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

module.exports = router;
