const router = require("express").Router();
const publicationModel = require("../models/publicationModel");

// GET all publications
router.get("/", async (req, res) => {
  try {
    const publication = await publicationModel.find();

    if (!publication) {
      return res.status(404).json({ message: "Photo card not found" });
    }

    res.json(publication);
  } catch (error) {
    console.error("Error retrieving publication data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET matching url
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

// POST
router.post("/", async (req, res) => {
  try {
    // Extract data from the request body
    const {
      publication_id,
      publication_url,
      product_id,
      user_email,
      user_first_name,
      user_last_name,
      message_option,
      donation_option,
      baby_first_name,
      baby_middle_name,
      baby_last_name,
      baby_birth_date,
      baby_birth_time,
      baby_weight,
      baby_length,
    } = req.body;

    // Create a new Publication instance
    const newPublication = new publicationModel({
      publication_id,
      publication_url,
      product_id,
      user_email,
      user_first_name,
      user_last_name,
      message_option,
      donation_option,
      baby_first_name,
      baby_middle_name,
      baby_last_name,
      baby_birth_date,
      baby_birth_time,
      baby_weight,
      baby_length,
    });

    // Save the new publication to the database
    await newPublication.save();

    // Send a success response
    res.status(201).json({ message: "Publication created successfully" });
  } catch (error) {
    // Handle errors
    console.error("----------------------------------------------------");
    console.error("Error creating publication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
