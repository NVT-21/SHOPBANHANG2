const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'userName is required'],
        
    },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password should be at least 8 characters long'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Password confirmation is required'],
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: 'Password confirmation does not match the password',
    },
  },
});


userSchema.pre('save', async function (next) {
  const hashedPassword = await bcrypt.hash(this.password, 10);
  const hashedPasswordConfirm = await bcrypt.hash(this.passwordConfirm, 10);

  this.password = hashedPassword;
  this.passwordConfirm = hashedPasswordConfirm;

  next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;
