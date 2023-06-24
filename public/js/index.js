const buttonAddToCart = document.getElementById('addToCart');
// const paymentProcess = require('./payment')
const searchProduct=document.getElementById('search-product')
const addToCart = require('./addToCart');
const btnIncs = document.querySelectorAll('.increment-button');
const updateCart = require('./updateCart');
const searchListProduct = document.getElementById('searchListProduct');
const formCreateProduct = document.getElementById('formCreateProduct');
const btnDecs= document.querySelectorAll('.decrement-button');
const btnDels = document.querySelectorAll('.remove-button');
const btnCheckOut = document.getElementById('checkout');
const createProduct = require('./createProduct');

console.log(buttonAddToCart);
console.log(btnIncs);
console.log(formCreateProduct);
console.log(btnDecs);

if (buttonAddToCart) {
  
    buttonAddToCart.addEventListener('click', (e) => {
      e.preventDefault();
      const productId = buttonAddToCart.getAttribute('data-product-id');
      
      addToCart(productId);
    });
  
}
if(btnIncs){
    for (let btnInc of btnIncs){
        btnInc.addEventListener('click', (e) => {
            e.preventDefault();
            const action=btnInc.getAttribute('data-action')
            const productId=btnInc.getAttribute('data-product-id')
            console.log({productId,action});
            updateCart(action,productId)

        })
    }
}
if(btnDecs){
  for (let btnDec of btnDecs){
      btnDec.addEventListener('click', (e) => {
          e.preventDefault();
          const action=btnDec.getAttribute('data-action')
          const productId=btnDec.getAttribute('data-product-id')
          console.log({productId,action});
          updateCart(action,productId)

      })
  }
}
if(btnDels){
  for (let btnDel of btnDels){
      btnDel.addEventListener('click', (e) => {
          e.preventDefault();
          const action=btnDel.getAttribute('data-action')
          const productId=btnDel.getAttribute('data-product-id')
          console.log({productId,action});
          updateCart(action,productId)

      })
  }
}
if(btnCheckOut){
  btnCheckOut.addEventListener('click', (e) => {
    window.location.href = '/product/payment';
  })
}
if(searchProduct){

  searchProduct.addEventListener('input', (e) => {
    const nameProduct=e.target.value
    let match=e.target.value.match(/\s*/)// match voi khoang cach de loc 
    if(match[0]===e.target.value) { // neu co khoang trang thi se vao day
      searchListProduct.innerHTML=''
      return
    }
    fetch('/product/search', {
        // Specify the HTTP method
        method: 'POST',// phair dung post chu khong phai get
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nameProduct:nameProduct }), // Convert data to JSON string
    })
        .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
        .then(data => {
          searchListProduct.innerHTML=''
          console.log(data);
          if(data.length<1 ){
            searchListProduct.innerHTML='<p>Nothing found</p>';  
          }
          
            data.forEach(el => {
              searchListProduct.innerHTML+=`<a href="/detailProduct/${el._id}" style="display: block; color: black;" class="history-element">${el.name}</a>
              `
            });
            return

           
          
        
        })
        .catch(error => {
        // Handle any errors
        console.error(error);
        });
      })
}
if(formCreateProduct){
  formCreateProduct.addEventListener('submit', (e) => {
    e.preventDefault();
  
    
  const form = new FormData();
form.append('name', document.getElementById('nameCreateProduct').value);
form.append('type', document.getElementById('typeProduct').value)
form.append('price', document.getElementById('priceProduct').value);
form.append('priceSale', document.getElementById('priceSale').value);
form.append('origin', document.getElementById('origin').value);
form.append('photo', document.getElementById('photoProduct').files[0]);

    createProduct(form);
  });
  
  
}



