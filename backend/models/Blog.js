const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  authorName: { type: String },
  category: { type: String, enum: ['news', 'tips', 'technology', 'market', 'policy', 'weather', 'other'], default: 'news' },
  tags: [{ type: String }],
  image: { type: String },
  isPublished: { type: Boolean, default: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  readTime: { type: Number, default: 3 }, // minutes
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
