const router = require("express").Router();
const UserModel = require("../models/userModel");

// GET all user
router.get("/", async (req, res) => {
  try {
    const user = await UserModel.find();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET a user
router.get("/:user_name", async (req, res) => {
  const user_name = req.params.user_name;

  try {
    const user = await UserModel.findById(user_name);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST published_photo_book
router.post("/:user_name", async (req, res) => {
  const user_name = req.params.user_name;

  // try {
  //   const user = await UserModel.findById(user_name);
  //   if (!user) {
  //     return res.status(404).json({ message: "User not found" });
  //   }
  //   res.json(user);
  // } catch (error) {
  //   console.error("Error retrieving user:", error);
  //   res.status(500).json({ message: "Internal server error" });
  // }
});

module.exports = router;
