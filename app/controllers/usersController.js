const express = require('express');
const gravatar = require('gravatar');
const _ = require('lodash');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const //Load User model
  { User } = require('../models/User');
const passport = require('passport');

const router = express.Router();

//@route GET  users/posts/test
//@desc Tests users route
//@access public
// router.get('/', (req, res) => {
//   console.log('hi');
// });

//@route GET  users/register
//@desc Register users
//@access public

router.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    res.status(400).send(errors);
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(409).json({ email: 'Email already exists' });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', //size
        r: 'pg', //rating
        d: 'mm', //default
      });
      req.body.avatar = avatar;
      const newUser = new User(req.body);
      const user = await newUser.save();
      if (user) {
        res.status(200).json(user);
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

//signIn route
router.post('/login', async (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    res.status(400).send(errors);
  }

  try {
    let user1 = await User.findByEmailAndPassword(body.email, body.password);
    const token = await user1.generateToken();
    res
      .header('x-auth', token)
      .status(200)
      .send({ success: true, token: token });
  } catch (error) {
    res.status(401).send(error);
  }
});

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //In req.user we will get the user data
    res.json(req.user);
  }
);

module.exports = {
  usersController: router,
};
