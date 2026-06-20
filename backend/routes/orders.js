const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');

router.use(protect);

// @GET /api/orders/cart
router.get('/cart', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    res.json({ success: true, cart: cart || { items: [] } });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @POST /api/orders/cart/add
router.post('/cart/add', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = new Cart({ user: req.user._id, items: [] });
    const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);
    if (itemIndex >= 0) cart.items[itemIndex].quantity += quantity;
    else cart.items.push({ product: productId, quantity });
    await cart.save();
    await cart.populate('items.product');
    res.json({ success: true, message: 'Added to cart', cart });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @PUT /api/orders/cart/update
router.put('/cart/update', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });
    const item = cart.items.find(i => i.product.toString() === productId);
    if (!item) return res.status(404).json({ success: false, message: 'Item not in cart' });
    if (quantity <= 0) cart.items = cart.items.filter(i => i.product.toString() !== productId);
    else item.quantity = quantity;
    await cart.save();
    res.json({ success: true, message: 'Cart updated', cart });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @DELETE /api/orders/cart/remove/:productId
router.delete('/cart/remove/:productId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId);
    await cart.save();
    res.json({ success: true, message: 'Item removed', cart });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @POST /api/orders/checkout
router.post('/checkout', async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, items, subtotal, shippingCost, discount, totalAmount } = req.body;
    const trackingNumber = 'AGR' + Date.now();
    const order = await Order.create({
      buyer: req.user._id, items, shippingAddress, paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      subtotal, shippingCost, discount, totalAmount, trackingNumber,
      deliveryTimeline: [{ status: 'placed', message: 'Order placed successfully', location: 'Online' }]
    });

    // Update product sold count
    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, { $inc: { soldCount: item.quantity, quantity: -item.quantity } });
    }

    // Clear cart
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });

    res.status(201).json({ success: true, message: 'Order placed successfully', order });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @GET /api/orders (buyer's orders)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @GET /api/orders/:id
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, buyer: req.user._id });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, order });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

// @PUT /api/orders/:id/cancel
router.put('/:id/cancel', async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, buyer: req.user._id });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    if (['shipped', 'delivered'].includes(order.orderStatus)) {
      return res.status(400).json({ success: false, message: 'Cannot cancel shipped/delivered order' });
    }
    order.orderStatus = 'cancelled';
    order.cancelReason = req.body.reason;
    order.deliveryTimeline.push({ status: 'cancelled', message: 'Order cancelled by buyer' });
    await order.save();
    res.json({ success: true, message: 'Order cancelled', order });
  } catch (error) { res.status(500).json({ success: false, message: error.message }); }
});

module.exports = router;
