const { ObjectId } = require("mongodb");
const router = require("express").Router();
const publicationModel = require("../models/publicationModel");

/********************************* GET ***********************************/
// GET
router.get("/", async (req, res) => {
  res.send({
    message: "welcome to Pixely API.",
  });
});

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
    res.status(500).json({ message: "Internal server error" });
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
    res.status(500).json({ message: "Internal server error" });
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
    res.status(500).json({ message: "Internal server error" });
  }
});

/******************************* POST *********************************/
// POST online photo card
router.post("/", async (req, res) => {
  try {
    const {
      publication_url,
      owner_email,
      owner_first_name,
      owner_last_name,
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
    } = req.body;

    const newPublication = new publicationModel({
      publication_url,
      owner_email,
      owner_first_name,
      owner_last_name,
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

    // Handle success
    res.status(201).json({
      publication_id: createdPublication.id,
    });
  } catch (error) {
    // Handle errors
    console.error("----------------------------------------------------");
    console.error("Error creating publication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}); //end of POST handler

module.exports = router;
