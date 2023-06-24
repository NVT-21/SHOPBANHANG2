const express = require('express');
const controlerProduct=require('../controllers/controllerProduct')
const app = express();
const Product = require('../models/product');
const router = express.Router();



router.get('/product/getAllProductCart',controlerProduct.getAllProductCart)
router.get('/createProduct',(req, res) => {
  res.render('createProduct');
})

router.get('/cart',controlerProduct.getAllProductCart,(req, res) => {
  const cart=res.locals.cart;


  res.render('Cart', cart)
  
  

 
})
router.get('/detailProduct/:productId',controlerProduct.detailProduct,(req, res) => {
  const productDetail=res.locals.detailProduct;
  res.render('detailProduct',{productDetail});
})

 // Import mô hình `products`

router.get('/', controlerProduct.getAllProduct, async (req, res) => {
  const productsList = res.locals.products;
  if (!req.query.page) {
    req.query.page = 1;
  }
  const pageCurrent = req.query.page;
  const countDoc = await Product.countDocuments();
  const sumPage = Math.ceil(countDoc / 8);
  
  res.render('index', { productsList, pageCurrent, sumPage });
});


module.exports =router