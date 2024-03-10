// variables
const router = require("express").Router();
const passport = require("passport");

const failRedirect = "http://localhost:4000/auth";
const successRedirect = "http://localhost:3000/create";

// routes
router.get("/", (req, res) => {
  res.send({ message: "Google OAuth and Facebook OAuth available" });
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
