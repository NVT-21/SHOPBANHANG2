const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  price :{
    type: String,
    required: true
  },
  priceSale:{
    type: String,
    required: true

  },
  type:{
    type: String,
    required: true
  },
  sold:{
    type: Number,
    default: 0
    

  },
  photo:{
    type: String,
    // required: true
    
  }
  
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
