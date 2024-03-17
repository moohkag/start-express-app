// variables
const router = require("express").Router();
const passport = require("passport");
require("../auths/googleAuth");
require("../auths/facebookAuth");

let successRedirect;
let failRedirect;
if (process.env.DOTENV === undefined) {
  require("dotenv").config();
  successRedirect = "http://localhost:3000";
  failRedirect = "http://localhost:3000/login";
} else {
  successRedirect = "https://pixely.ca";
  failRedirect = "https://pixely.ca/login";
}

// routes
router.get("/", (req, res) => {
  res.send({ message: "Google OAuth and Facebook OAuth available" });
});

router.get("/login", (req, res) => {
  res.json("Manual login route. Coming soon.");
});

router.post("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
});

// Google Oauth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: successRedirect,
    failureRedirect: failRedirect,
  })
);

// Facebook Oauth
router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: failRedirect,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect(successRedirect);
  }
);

/////////// profile //////////////////////////////////////////////////
let redirectLocation;
if (process.env.DOTENV === undefined) {
  require("dotenv").config();
  redirectLocation = "http://localhost:3000/login";
} else {
  redirectLocation = "https://pixely.ca/login";
}

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.send({ message: "login required" });
};

router.get("/profile", checkAuthenticated, (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "successfully logged in",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get("/check/profile", checkAuthenticated, (req, res) => {
  if (req.user) {
    res.status(200).json({
      isLoggedIn: true,
    });
  } else {
    res.status(403).json({ isLoggedIn: false });
  }
});

module.exports = router;
