const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_KEY
};

passport.use(
  new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
      const user = await User.findOne({ _id: jwt_payload._id });
      if (user == null) {
        done(null, false);
      }
      done(null, user);
    } catch (err) {
      done(err);
    }
  })
);
