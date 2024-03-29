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
    const {
      publication_url,
      user_id,
      user_display_name,
      template_id,
      donation_option,

      first_name,
      middle_name,
      last_name,
      date_of_birth,
      date_of_passing,
      epitaph,
      obituary,
      photo,
    } = req.body;

    const newPublication = new publicationModel({
      publication_url,
      user_id,
      user_display_name,
      template_id,
      donation_option,

      //
      first_name,
      middle_name,
      last_name,
      date_of_birth,
      date_of_passing,
      epitaph,
      obituary,
      photo,
    });

    // Save the new publication to the database
    const createdPublication = await newPublication.save();

    // Handle success for confirmation page
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
