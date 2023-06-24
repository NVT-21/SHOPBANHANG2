const express = require('express');
const router = express.Router();
const controllerProduct=require('../controllers/controllerProduct');
router.post('/createProduct',controllerProduct.updatePhoto,controllerProduct.createProduct);
router.post('/addProductCart/:productId',controllerProduct.addToCart)
router.get('/getAllProductCart',controllerProduct.getAllProductCart);
router.get('/payment',controllerProduct.paymentProduct)
router.get('/success',controllerProduct.paymentSucces)
router.post('/search',controllerProduct.searchProduct)
router.post('/:action/:productId',controllerProduct.cartUpdate)
router.get('/getAllProduct',controllerProduct.getAllProduct)
module.exports=router;