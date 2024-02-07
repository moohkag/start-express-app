const passport = require("passport");
const UserModel = require("../models/userModel");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

const callbackURLString = "http://localhost:4000/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackURLString,
      // passReqToCallback: true,
    },
    function (accessToken, refreshToken, profile, cb) {
      // UserModel.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
      cb(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
