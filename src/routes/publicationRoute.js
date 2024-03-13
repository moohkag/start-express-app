const { ObjectId } = require("mongodb");
const router = require("express").Router();
const publicationModel = require("../models/publicationModel");

/********************************* GET ***********************************/
// GET api/publications
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
        owner_first_name: 1,
        owner_last_name: 1,
        owner_email: 1,
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
// POST online memorial
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

// POST new tribute
router.post("/update-tribute/:publication_url", async (req, res) => {
  try {
    const { publication_url } = req.params;
    const { tribute } = req.body;

    // Find the publication by publication_url
    const publication = await publicationModel.findOne({ publication_url });

    if (!publication) {
      return res.status(404).json({ message: "Publication not found" });
    }

    // Generate a unique ObjectId for the _id field
    const objectId = mongoose.Types.ObjectId();

    // Add the _id field and other fields to the tribute object
    const tributeWithId = { ...tribute, _id: objectId };

    // Push the new tribute object to the tributes array
    publication.tributes.push(tributeWithId);

    // Save the updated publication to the database
    const updatedPublication = await publication.save();

    res.status(200).json(updatedPublication);
  } catch (error) {
    // Handle errors
    console.error("Error updating publication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/******************************* DELETE *********************************/
// DELETE tribute comment
router.delete("/delete-tribute", async (req, res) => {
  try {
    const {} = req.body;

    const newPublication = new publicationModel({});

    // Save the new publication to the database
    const createdPublication = await newPublication.save();
  } catch (error) {
    // Handle errors
    console.error("----------------------------------------------------");
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
