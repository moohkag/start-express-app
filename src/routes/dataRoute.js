const { ObjectId } = require("mongodb");
const router = require("express").Router();
const publicationModel = require("../models/dataModel");

/********************************* GET ***********************************/
router.get("/", async (req, res) => {
  res.send({
    message: "data api",
  });
});

/********************************* POST ***********************************/
router.post("/", async (req, res) => {
  try {
    const { dataOne } = req.body;

    const newPublication = new publicationModel({
      dataProperty: dataOne,
    });

    const createdPublication = await newPublication.save();

    res.status(201).json({
      publication_id: createdPublication.id,
    });
  } catch (error) {
    // Handle errors
    console.error("----------------------------------------------------");
    console.error("Error creating publication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
