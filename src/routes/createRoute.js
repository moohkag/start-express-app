const router = require("express").Router();

router.get("/", (req, res) => {
  res.send({ message: "create working fine" });
});

module.exports = router;
