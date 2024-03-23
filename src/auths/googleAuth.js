let callbackURLString;
if (process.env.DOTENV === undefined) {
  callbackURLString = "http://localhost:4000/auth/google/callback";
} else {
  callbackURLString = "https://pixely-server.vercel.app/auth/google/callback";
}

const passport = require("passport");
const UserModel = require("../models/userModel");
var GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackURLString,
    },
    function (accessToken, refreshToken, profile, done) {
      //check if it is existing user
      UserModel.findOne({
        "login_method.login_provider": "google",
        "login_method.login_id": profile.id,
      }).then((currentUser) => {
        if (currentUser) {
          // already user
          done(null, currentUser);
        } else {
          // new user
          new UserModel({
            user_display_name: profile.displayName,
            user_email: profile.emails[0].value,
            user_picture: profile._json.picture,
            login_method: {
              login_provider: profile.provider,
              login_id: profile.id,
            },
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
            });
        }
      });
    } //end of function
  )
);

passport.serializeUser((user, done) => {
  // const serializedUser = {
  //   _id: user._id,
  //   user_display_name: user.user_display_name,
  //   user_picture: user.user_picture,
  // };
  // done(null, serializedUser);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
