const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const key = require('../config/key');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secretKey;

// console.log(key.secretKey);
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, async (jwt_payLoad, done) => {
      try {
        let user = await User.findById(jwt_payLoad._id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        console.log(err);
      }
    })
  );
};
