const appError=require('../utils/appError');
const asyncError=require('../utils/asyncError');
const product=require('../models/product');
const cart=require('../models/cart');
const paypal = require('paypal-rest-sdk');
const multer = require('multer')
const apiFeature=require('../utils/apiFeature');
const { response } = require('express');
const Product = require('../models/product');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img')
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split('/')[1]
    cb(null, `product-${Math.round(Math.random() * 1E9)}-${Date.now()}.${ext}`)
  }
})
const imageFilter = (req, file, cb) => {
  // Kiểm tra phần mở rộng của tệp
  if (file.mimetype.startsWith('image')) {
    // Được coi là tệp hình ảnh
    cb(null, true);
  } else {
    // Không phải tệp hình ảnh
    cb(new appError('Only image files are allowed!',400), false);

  }
};
const upload = multer({
  
  storage: storage,
  fileFilter: imageFilter });

class controllerProduct{
    createProduct=asyncError(async(req,res,next)=>{
        console.log(req.file)
        const photo=req.file.filename
        const {name,type,price ,origin,priceSale}=req.body;
        const currProduct=await product.create({name:name,price,origin,priceSale:priceSale,type:type,photo});
        res.status(200).send({success:"success",currProduct})
    })
    saveBill=asyncError(async(req,res,next)=>{
        const idProduct=req.params.id
        console.log(idProduct)
        const newProduct=await product.findById(idProduct)
        const newCart= await cart.create({product:newProduct})
        res.status(200).send({success:"success",newCart})
    })
    addToCart = asyncError(async (req, res, next) => {
        const productId = req.params.productId;
        const sessionId = req.session.id;
      
        if (!req.session.cart) {
          // If the cart doesn't exist, create a new one
          req.session.cart = [];
        }
      
        // Check if the product already exists in the cart
        let productExists = false;
        for (const item of req.session.cart) {
          if (item.productId === productId) {
            item.quantity++;
            productExists = true;
            break;
          }
        }
      
        // If the product doesn't exist in the cart, add it
        if (!productExists) {
          req.session.cart.push({ productId: productId, quantity: 1 });
        }
      
        const cart = req.session.cart;
        res.status(200).send({ status: "success", cart, sessionId });
      });
      
      getAllProductCart = asyncError(async (req, res, next) => {
        if (req.session.cart) {
          var totalPrice = 0;
          var totalQuantity = 0;
          var cart = req.session.cart;
          for (const el of cart) {
            const productEl = await product.findById(el.productId);
            const price = productEl.priceSale * el.quantity;
            el.price = price;
            el.product = productEl;
            totalPrice += el.price;
            totalQuantity += el.quantity;
          }
          cart.totalPrice = totalPrice
          cart.totalQuantity = totalQuantity
        
      
          req.session.cart = cart; // Lưu cart mới vào session
          res.locals.cart = cart;
        }
        next();
      });
      
      cartUpdate=asyncError(async(req, res, next)=>{
        if (req.session.cart) {
          const action = req.params.action;
          const productId = req.params.productId;
          
          for (let el of req.session.cart) {
            if (el.productId === productId) {
              switch (action) {
                case "add":
                  el.quantity++;
                  break;
                case "remove":
                  if (el.quantity > 0) {
                    el.quantity--;
                  }
                  break;
                case "delete":
                  const index = req.session.cart.indexOf(el);
                  if (index !== -1) {
                    req.session.cart.splice(index, 1);
                  }
                  break;
                default:
                  // Xử lý trường hợp không phù hợp với action
                  break;
              }
              break; // Thoát khỏi vòng lặp khi đã tìm thấy sản phẩm
            
          }
          
          }
          const cart = req.session.cart;
          res.locals.cart = cart
          res.send(cart)
          
         
          
        }
        
        next();
      });
      
      getAllProduct=asyncError(async(req, res, next)=>{
       
        const features = new apiFeature(product.find(), req.query).filter().sort().fields().page();
        const products = await features.query;
       
        
        res.locals.products=products
        next()

      })
      paymentProduct=asyncError(async(req, res, next)=>{
        paypal.configure({
          mode: 'sandbox', // 'sandbox' or 'live' depending on your environment
          client_id: 'AYz9rewmeo5k14MHl8Sl-hllNLxR2IrvYDjjxr5-0QIlOYvuSfJ9amfaJ4hJ8qRuPMbCXfKC4Luv4gqm',
          client_secret: 'EDUv4c3MdPCyMLxdLcgTDSgx1rQ4NIRvhXjjhVZomgqPvYZdOmW3XzVLIzr0LlPA1-QjJ_g2k22KdUyu',
        });
        var cart=req.session.cart;
        // console.log(cart);
        const items = [];
        for (const item of cart) {
          const { product, quantity, price } = item;
          const itemData = {
            
            name:product.name,
            quantity,
            price,
            sku:product._id,
            currency:"USD"

            
          };
  items.push(itemData);
}
 
  var totalPrice = 0;
  for (const item of cart) {
    totalPrice += item.price;
  }


        const paymentRequest = {
          intent: 'sale',
          payer: {
            payment_method: 'paypal',
          },
         
          redirect_urls: {
            return_url: 'http://127.0.0.1:3000/product/success',
            cancel_url: 'http://127.0.0.1:3000/cancel',
          },
          transactions: [
            {
              amount: {
                total: totalPrice, // Total amount for the payment
                currency: 'USD', // Currency code (e.g., USD, EUR)
              },
              description: 'Payment description',
              item_list: {
                items
              }
              } ],
            }
        
        paypal.payment.create(paymentRequest, (error, payment) => {
          if (error) {
            console.error(error);
            res.redirect('/'); // Redirect to a cancel page or handle the error accordingly
          } else {
            // Redirect the user to the PayPal payment page
            res.redirect(payment.links.find(link => link.rel === 'approval_url').href);
          }
        });
      })
      paymentSucces=asyncError(async(req, res, next)=>{
        const paymentId = req.query.paymentId;
        const payerId = req.query.PayerID;
      
        const executePayment = {
          payer_id: payerId,
        };
      
        paypal.payment.execute(paymentId, executePayment, (error, payment) => {
          if (error) {
            console.error(error);
            res.redirect('/cancel'); // Redirect to a cancel page or handle the error accordingly
          } else {
            
            var purchasedProducts = [];
            // lấy thông tin nhung product đã thanh toán 
            payment.transactions.forEach(transaction => {
              transaction.item_list.items.forEach(item => {
                var purchasedProduct = {
                  _id: item.sku,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity
                };
                purchasedProducts.push(purchasedProduct);
              });
            });
            
            // Xử lý thông tin sản phẩm đã mua tại đây
            purchasedProducts.forEach(async el => {
              const productId = el._id;
              const quantitySold = el.quantity;
            
              try {
                const updatedProduct = await product.findOneAndUpdate(
                  { _id: productId }, // Điều kiện tìm kiếm sản phẩm
                  { $inc: { sold: quantitySold } }, // Tăng số lượng đã bán theo số lượng mua
                  { new: true } // Trả về sản phẩm sau khi cập nhật
                );
                
              } catch (error) {
                console.error('Lỗi cập nhật sản phẩm:', error);
              }
            });
           
              
           
            // Payment executed successfully, handle success logic here
            res.redirect('/'); // Redirect to a thank you page or any other desired page
          }
        });
      })
      searchProduct=asyncError(async(req,res,next)=>{
        const nameProduct = req.body.nameProduct.trim()
        const products= await product 
        .find({ name: { $regex: '^' + nameProduct, $options: 'i' } }) //opton là để tìm kiếm không phân biệt hoa hay không // Case-insensitive search by product name
        const limitedProducts = products.slice(0, 5);
       res.send(limitedProducts)
      })
      updatePhoto = upload.single('photo');
      detailProduct = asyncError(async(req,res,next)=>{
        const productId=req.params.productId
        const product = await Product.findById(productId)
        res.locals.detailProduct = product
        next()
        
      })
      
        
      
    
    
}
module.exports=new controllerProduct