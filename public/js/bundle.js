/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/addToCart.js":
/*!********************************!*\
  !*** ./public/js/addToCart.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\r\nconst showAlert = __webpack_require__(/*! ./alert.js */ \"./public/js/alert.js\");\r\nconst addToCart = (productId) => {\r\n  axios\r\n    .post(`http://127.0.0.1:3000/product/addProductCart/${productId}`)\r\n    .then((response) => {\r\n      // Xử lý dữ liệu trả về\r\n      if(response.data.status==='success')\r\n        {\r\n            showAlert('success','addToCart successful');\r\n            // window.setTimeout(()=>{\r\n            //     location.assign('/');\r\n            // },1500);\r\n          }\r\n      console.log(response.data);\r\n    })\r\n    .catch((error) => {\r\n      // Xử lý lỗi\r\n      console.error(error);\r\n    });\r\n};\r\n\r\nmodule.exports = addToCart;\r\n\n\n//# sourceURL=webpack://shopbanhang/./public/js/addToCart.js?");

/***/ }),

/***/ "./public/js/alert.js":
/*!****************************!*\
  !*** ./public/js/alert.js ***!
  \****************************/
/***/ ((module) => {

eval("const showAlert = (type, msg) => {\r\n    const markup = `<div class=\"alert alert--${type}\">${msg}</div>`;\r\n    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);\r\n  \r\n    // Remove alert after 5 seconds\r\n    setTimeout(() => {\r\n      const alert = document.querySelector('.alert');\r\n      if (alert) alert.parentElement.removeChild(alert);\r\n    }, 5000);\r\n  };\r\nmodule.exports =showAlert;\r\n\n\n//# sourceURL=webpack://shopbanhang/./public/js/alert.js?");

/***/ }),

/***/ "./public/js/createProduct.js":
/*!************************************!*\
  !*** ./public/js/createProduct.js ***!
  \************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const showAlert = __webpack_require__(/*! ./alert */ \"./public/js/alert.js\")\r\n\r\nconst createProduct = async (data) => {\r\n   \r\n  try{\r\n      console.log(\"update\",data.photo);\r\n      const res = await axios({\r\n          method: 'POST',\r\n          url: 'http://127.0.0.1:3000/product/createProduct ',\r\n          // headers: {\r\n          //   'Content-Type': 'multipart/form-data',\r\n          // },\r\n          data,\r\n              \r\n      \r\n          withCredentials: true\r\n          \r\n      });\r\n      console.log(res);\r\n      //  if(res.data.status='success') location.reload(true);\r\n      if(res.data.success==='success')\r\n      {\r\n          showAlert('success','Tạo sản phẩm thành công');\r\n          // window.setTimeout(()=>{\r\n          //     location.assign('/');\r\n          // },1500);\r\n      }\r\n      \r\n      \r\n      \r\n     \r\n  }\r\n  catch(err) {\r\n     \r\n     console.log(err);\r\n  }\r\n   \r\n};\r\n\r\n\r\nmodule.exports = createProduct;\n\n//# sourceURL=webpack://shopbanhang/./public/js/createProduct.js?");

/***/ }),

/***/ "./public/js/index.js":
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const buttonAddToCart = document.getElementById('addToCart');\r\n// const paymentProcess = require('./payment')\r\nconst searchProduct=document.getElementById('search-product')\r\nconst addToCart = __webpack_require__(/*! ./addToCart */ \"./public/js/addToCart.js\");\r\nconst btnIncs = document.querySelectorAll('.increment-button');\r\nconst updateCart = __webpack_require__(/*! ./updateCart */ \"./public/js/updateCart.js\");\r\nconst searchListProduct = document.getElementById('searchListProduct');\r\nconst formCreateProduct = document.getElementById('formCreateProduct');\r\nconst btnDecs= document.querySelectorAll('.decrement-button');\r\nconst btnDels = document.querySelectorAll('.remove-button');\r\nconst btnCheckOut = document.getElementById('checkout');\r\nconst createProduct = __webpack_require__(/*! ./createProduct */ \"./public/js/createProduct.js\");\r\n\r\nconsole.log(buttonAddToCart);\r\nconsole.log(btnIncs);\r\nconsole.log(formCreateProduct);\r\nconsole.log(btnDecs);\r\n\r\nif (buttonAddToCart) {\r\n  \r\n    buttonAddToCart.addEventListener('click', (e) => {\r\n      e.preventDefault();\r\n      const productId = buttonAddToCart.getAttribute('data-product-id');\r\n      \r\n      addToCart(productId);\r\n    });\r\n  \r\n}\r\nif(btnIncs){\r\n    for (let btnInc of btnIncs){\r\n        btnInc.addEventListener('click', (e) => {\r\n            e.preventDefault();\r\n            const action=btnInc.getAttribute('data-action')\r\n            const productId=btnInc.getAttribute('data-product-id')\r\n            console.log({productId,action});\r\n            updateCart(action,productId)\r\n\r\n        })\r\n    }\r\n}\r\nif(btnDecs){\r\n  for (let btnDec of btnDecs){\r\n      btnDec.addEventListener('click', (e) => {\r\n          e.preventDefault();\r\n          const action=btnDec.getAttribute('data-action')\r\n          const productId=btnDec.getAttribute('data-product-id')\r\n          console.log({productId,action});\r\n          updateCart(action,productId)\r\n\r\n      })\r\n  }\r\n}\r\nif(btnDels){\r\n  for (let btnDel of btnDels){\r\n      btnDel.addEventListener('click', (e) => {\r\n          e.preventDefault();\r\n          const action=btnDel.getAttribute('data-action')\r\n          const productId=btnDel.getAttribute('data-product-id')\r\n          console.log({productId,action});\r\n          updateCart(action,productId)\r\n\r\n      })\r\n  }\r\n}\r\nif(btnCheckOut){\r\n  btnCheckOut.addEventListener('click', (e) => {\r\n    window.location.href = '/product/payment';\r\n  })\r\n}\r\nif(searchProduct){\r\n\r\n  searchProduct.addEventListener('input', (e) => {\r\n    const nameProduct=e.target.value\r\n    let match=e.target.value.match(/\\s*/)// match voi khoang cach de loc \r\n    if(match[0]===e.target.value) { // neu co khoang trang thi se vao day\r\n      searchListProduct.innerHTML=''\r\n      return\r\n    }\r\n    fetch('/product/search', {\r\n        // Specify the HTTP method\r\n        method: 'POST',// phair dung post chu khong phai get\r\n        headers: {\r\n          'Content-Type': 'application/json',\r\n        },\r\n        body: JSON.stringify({ nameProduct:nameProduct }), // Convert data to JSON string\r\n    })\r\n        .then(response => {\r\n        if (!response.ok) {\r\n            throw new Error('Network response was not ok');\r\n        }\r\n        return response.json();\r\n        })\r\n        .then(data => {\r\n          searchListProduct.innerHTML=''\r\n          console.log(data);\r\n          if(data.length<1 ){\r\n            searchListProduct.innerHTML='<p>Nothing found</p>';  \r\n          }\r\n          \r\n            data.forEach(el => {\r\n              searchListProduct.innerHTML+=`<a href=\"/detailProduct/${el._id}\" style=\"display: block; color: black;\" class=\"history-element\">${el.name}</a>\r\n              `\r\n            });\r\n            return\r\n\r\n           \r\n          \r\n        \r\n        })\r\n        .catch(error => {\r\n        // Handle any errors\r\n        console.error(error);\r\n        });\r\n      })\r\n}\r\nif(formCreateProduct){\r\n  formCreateProduct.addEventListener('submit', (e) => {\r\n    e.preventDefault();\r\n  \r\n    \r\n  const form = new FormData();\r\nform.append('name', document.getElementById('nameCreateProduct').value);\r\nform.append('type', document.getElementById('typeProduct').value)\r\nform.append('price', document.getElementById('priceProduct').value);\r\nform.append('priceSale', document.getElementById('priceSale').value);\r\nform.append('origin', document.getElementById('origin').value);\r\nform.append('photo', document.getElementById('photoProduct').files[0]);\r\n\r\n    createProduct(form);\r\n  });\r\n  \r\n  \r\n}\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://shopbanhang/./public/js/index.js?");

/***/ }),

/***/ "./public/js/updateCart.js":
/*!*********************************!*\
  !*** ./public/js/updateCart.js ***!
  \*********************************/
/***/ ((module) => {

eval("\r\nconst updateCart=(action,productId)=>{\r\n    axios\r\n    .post(`http://127.0.0.1:3000/product/${action}/${productId}`)\r\n    .then((response) => {\r\n      // Xử lý dữ liệu trả về\r\n      \r\n      console.log(response.data);\r\n      location.reload()\r\n    })\r\n    .catch((error) => {\r\n      // Xử lý lỗi\r\n      console.error(error.response.data, error.message);\r\n    });\r\n  }\r\n   module.exports = updateCart\r\n\r\n\r\n\n\n//# sourceURL=webpack://shopbanhang/./public/js/updateCart.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/js/index.js");
/******/ 	
/******/ })()
;