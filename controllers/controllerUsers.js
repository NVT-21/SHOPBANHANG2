const appError=require('../utils/appError');
const asyncError=require('../utils/asyncError');
const User=require('../models/user');
class controlerUsers{
    signUp=asyncError(async(req, res, next) =>{
        const {username, email,password,passwordConfirm}=req.body
        const user = new User({username, email, password, passwordConfirm});
        await user.save();
  
        res.status(201).json({success:"success", user });
        

    })
}
module.exports=new controlerUsers;