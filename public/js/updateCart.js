
const updateCart=(action,productId)=>{
    axios
    .post(`http://127.0.0.1:3000/product/${action}/${productId}`)
    .then((response) => {
      // Xử lý dữ liệu trả về
      
      console.log(response.data);
      location.reload()
    })
    .catch((error) => {
      // Xử lý lỗi
      console.error(error.response.data, error.message);
    });
  }
   module.exports = updateCart


