const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  email: { type: String, required: true },
  type: { type: String, enum: ['general', 'bug', 'feature', 'complaint', 'compliment'], default: 'general' },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5 },
  status: { type: String, enum: ['open', 'in_progress', 'resolved', 'closed'], default: 'open' },
  response: { type: String },
  respondedAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
