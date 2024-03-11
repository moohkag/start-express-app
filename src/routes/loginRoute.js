// variables
const router = require("express").Router();
const passport = require("passport");
require("../auths/googleAuth");
let successRedirect;
let failRedirect;
if (process.env.DOTENV === undefined) {
  require("dotenv").config();
  successRedirect = "http://localhost:3000";
  failRedirect = "http://localhost:3000";
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

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(failRedirect);
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

module.exports = router;
