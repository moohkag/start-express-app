const { ObjectId } = require("mongodb");
const router = require("express").Router();
const publicationModel = require("../models/publicationModel");

/********************************* GET ***********************************/
// GET online photo card
router.get("/:publication_url", async (req, res) => {
  try {
    const publication = await publicationModel.findOne({
      publication_url: req.params.publication_url,
    });

    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }

    res.json(publication);
  } catch (error) {
    console.error("Error retrieving publication data:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

// GET check publication_url availability
router.get("/check/:publication_url", async (req, res) => {
  try {
    const publication = await publicationModel.findOne(
      { publication_url: req.params.publication_url },
      { publication_url: 1, _id: 0 }
    );

    if (!publication) {
      return res.status(200).json({ available: true });
    } else {
      return res.status(200).json({ available: false });
    }
  } catch (error) {
    console.error("Error checking publication URL:", error);
    res.status(500).json({ message: error });
  }
});

// GET confirmation info
router.get("/confirmation/:publication_id", async (req, res) => {
  try {
    const confirmation = await publicationModel.findOne(
      { _id: req.params.publication_id },
      {
        publication_url: 1,
        user_first_name: 1,
        user_last_name: 1,
        user_email: 1,
        _id: 0,
      }
    );

    if (!confirmation) {
      return res.status(404).json({ message: "Publication not found" });
    } else {
      return res.status(200).json(confirmation);
    }
  } catch (error) {
    console.error("Error retrieving confirmation data:", error);
    res.status(500).json({ message: error });
  }
});

/******************************* POST *********************************/
// POST online photo card
router.post("/", async (req, res) => {
  try {
    const {
      publication_url,

      user_email,
      user_first_name,
      user_last_name,

      template_id,
      message_option,
      donation_option,

      baby_first_name,
      baby_middle_name,
      baby_last_name,
      baby_birth_date,
      baby_birth_time,
      baby_weight,
      baby_length,
      baby_photo,
    } = req.body;

    const newPublication = new publicationModel({
      publication_url,

      user_email,
      user_first_name,
      user_last_name,

      template_id,
      message_option,
      donation_option,

      baby_first_name,
      baby_middle_name,
      baby_last_name,
      baby_birth_date,
      baby_birth_time,
      baby_weight,
      baby_length,
      baby_photo,
    });

    // Save the new publication to the database
    const createdPublication = await newPublication.save();

    // Handle success
    res.status(201).json({
      publication_id: createdPublication.id,
    });
  } catch (error) {
    // Handle errors
    console.error("----------------------------------------------------");
    console.error("Error creating publication:", error);
    res.status(500).json({ message: error });
  }
}); //end of POST handler

module.exports = router;
