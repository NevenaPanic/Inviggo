const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  price: Number,
  category: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  city: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ad', adSchema);