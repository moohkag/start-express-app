// variables
const router = require("express").Router();
const passport = require("passport");
require("../auths/googleAuth");
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

router.post("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

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

// profile /////////////////////////////////////////////////////
let redirectLocation;
if (process.env.DOTENV === undefined) {
  require("dotenv").config();
  redirectLocation = "http://localhost:3000/login";
} else {
  redirectLocation = "https://pixely.ca/login";
}

const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    //dev
    // console.log("True isAuthenticated");
    return next();
  }
  //dev
  // console.log("False isAuthenticated");
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

router.get("/profile/test", (req, res) => {
  const cookieValue = req.cookies;

  if (cookieValue) {
    res.send(`Value retrieved from cookie: ${cookieValue}`);
  } else {
    res.send({ message: "Cookie not found" });
  }
});

module.exports = router;
