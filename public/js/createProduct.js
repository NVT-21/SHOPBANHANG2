const showAlert = require('./alert')

const createProduct = async (data) => {
   
  try{
      console.log("update",data.photo);
      const res = await axios({
          method: 'POST',
          url: 'http://127.0.0.1:3000/product/createProduct ',
          // headers: {
          //   'Content-Type': 'multipart/form-data',
          // },
          data,
              
      
          withCredentials: true
          
      });
      console.log(res);
      //  if(res.data.status='success') location.reload(true);
      if(res.data.success==='success')
      {
          showAlert('success','Tạo sản phẩm thành công');
          // window.setTimeout(()=>{
          //     location.assign('/');
          // },1500);
      }
      
      
      
     
  }
  catch(err) {
     
     console.log(err);
  }
   
};


module.exports = createProduct;