const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  price: Number,
  category: { type: String, enum: ['clothing', 'tools', 'sports', 'accessories', 'furniture', 'pets', 'games', 'books', 'technology'] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  city: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ad', adSchema);