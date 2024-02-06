const router = require("express").Router();
const userModel = require("../models/userModel");

router.get("/", (req, res) => {
  res.send({ message: "create working fine" });
});

module.exports = router;
