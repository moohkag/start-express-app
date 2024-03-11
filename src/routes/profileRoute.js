const router = require("express").Router();
let redirectLocation;
if (process.env.DOTENV === undefined) {
  require("dotenv").config();
  redirectLocation = "http://localhost:3000/login";
} else {
  redirectLocation = "https://pixely.ca/login";
}

const checkLoggedIn = (req, res, next) => {
  if (req.session) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};

router.get("/", checkLoggedIn, (req, res) => {
  const userData = req.user;

  res.json(userData);
});

module.exports = router;
