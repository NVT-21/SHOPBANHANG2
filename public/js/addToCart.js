
const showAlert = require('./alert.js');
const addToCart = (productId) => {
  axios
    .post(`http://127.0.0.1:3000/product/addProductCart/${productId}`)
    .then((response) => {
      // Xử lý dữ liệu trả về
      if(response.data.status==='success')
        {
            showAlert('success','addToCart successful');
            // window.setTimeout(()=>{
            //     location.assign('/');
            // },1500);
          }
      console.log(response.data);
    })
    .catch((error) => {
      // Xử lý lỗi
      console.error(error);
    });
};

module.exports = addToCart;
