const mongoose = require('mongoose');
const Category = require('../enums/Category');

const adSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  imageUrl: String,
  price: Number,
  category: { type: String, enum: Category.values },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  city: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Ad', adSchema);