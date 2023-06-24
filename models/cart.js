const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  totalPrice: {
    type: Number,
    
  }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
