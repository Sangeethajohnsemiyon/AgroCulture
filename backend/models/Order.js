const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String, image: String, price: Number, quantity: Number, unit: String
  }],
  shippingAddress: {
    name: String, phone: String, street: String,
    city: String, state: String, pincode: String, country: { type: String, default: 'India' }
  },
  paymentMethod: { type: String, enum: ['cod', 'upi', 'card', 'netbanking'], default: 'cod' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed', 'refunded'], default: 'pending' },
  paymentId: { type: String },
  orderStatus: { type: String, enum: ['placed', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'returned'], default: 'placed' },
  subtotal: { type: Number, required: true },
  shippingCost: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  totalAmount: { type: Number, required: true },
  trackingNumber: { type: String },
  deliveryDate: { type: Date },
  deliveryTimeline: [{
    status: String, message: String, timestamp: { type: Date, default: Date.now }, location: String
  }],
  notes: { type: String },
  cancelReason: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
