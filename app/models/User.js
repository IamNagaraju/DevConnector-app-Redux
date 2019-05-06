const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { secretKey } = require('../../config/key');
const jwt = require('jsonwebtoken');
// const passport = require('passport');

const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', function(next) {
  let userObject = this;
  if (userObject.isModified('password')) {
    bcrypt.genSalt(10).then(salt => {
      bcrypt.hash(userObject.password, salt).then(hashedPassword => {
        userObject.password = hashedPassword;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.statics.findByEmailAndPassword = async function(email, password) {
  console.log('model');
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      console.log('not');
      return Promise.reject({ email: 'email is not found' });
    }
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (passwordMatched) {
      return user;
    } else {
      return Promise.reject({ password: 'Invalid Password' });
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

UserSchema.methods.generateToken = async function() {
  const user = this;
  const payLoad = {
    _id: user._id,
    email: user.email,
    avatar: user.avatar,
    name: user.name,
  };
  
  try {
    const generateTokenInfo = {
    token: jwt.sign(payLoad, secretKey, { expiresIn: '2d' }),
    // to keep expire for token we can do like token: jwt.sign(payLoad, process.env.JWT_SIGNATURE,{
    // expiresIn: '2d' // expires in 24 hours
    // }
  };
  await user.save();
  return 'Bearer ' + generateTokenInfo.token;
  }catch(error) {
  return Promise.reject(error)
  }
  
};

const User = mongoose.model('User', UserSchema);
module.exports = {
  User,
};
