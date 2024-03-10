const passport = require("passport");
const UserModel = require("../models/userModel");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

let callbackURLString;
if (process.env.DOTENV === undefined) {
  callbackURLString = "http://localhost:4000/auth/google/callback";
} else {
  callbackURLString =
    "https://pixely-server-f1ba3abe57b4.herokuapp.com/auth/google/callback";
}

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackURLString,
    },
    function (accessToken, refreshToken, profile, cb) {
      // UserModel.findOrCreate({ login_method: "login_provider":"google" }, function (err, user) {
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
