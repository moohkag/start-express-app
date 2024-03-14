let callbackURLString;
if (process.env.DOTENV === undefined) {
  callbackURLString = "http://localhost:4000/auth/facebook/callback";
} else {
  callbackURLString =
    "https://pixely-server-f1ba3abe57b4.herokuapp.com/auth/facebook/callback";
}

const passport = require("passport");
const UserModel = require("../models/userModel");
var FacebookStrategy = require("passport-facebook").Strategy;

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: callbackURLString,
      profileFields: ["id", "displayName", "photos", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      //check if it is existing user
      UserModel.findOne({
        "login_method.login_provider": "facebook",
        "login_method.login_id": profile.id,
      }).then((currentUser) => {
        if (currentUser) {
          // already user
          done(null, currentUser);
        } else {
          // new user
          new UserModel({
            user_display_name: profile.displayName,
            // user_email: profile.email?.value,
            user_picture: profile.photos[0].value,
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
