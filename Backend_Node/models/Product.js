const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  category: {type: String, required: true},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Veggies_Product', productSchema);