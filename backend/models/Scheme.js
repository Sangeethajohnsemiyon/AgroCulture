const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ministry: { type: String },
  category: { type: String, enum: ['subsidy', 'loan', 'insurance', 'training', 'equipment', 'other'], default: 'other' },
  eligibility: { type: String },
  benefits: [{ type: String }],
  applicationProcess: { type: String },
  documents: [{ type: String }],
  deadline: { type: Date },
  link: { type: String },
  state: { type: String, default: 'All India' },
  isActive: { type: Boolean, default: true },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Scheme', schemeSchema);
