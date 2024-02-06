const router = require("express").Router();
const userModel = require("../models/userModel");

router.get("/", async (req, res) => {
  try {
    const data = await userModel.find();

    if (!data) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
