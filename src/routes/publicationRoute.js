const router = require("express").Router();
const { Readable } = require("stream");
const multer = require("multer");
const upload = multer();

const publicationModel = require("../models/publicationModel");

// GET all publications
// router.get("/", async (req, res) => {
//   try {
//     const publication = await publicationModel.find();

//     if (!publication) {
//       return res.status(404).json({ message: "Photo websites not found" });
//     }

//     res.json(publication);
//   } catch (error) {
//     console.error("Error retrieving publication data:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// GET find photo website with publication_url
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

// GET check publication_url
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
    console.error("Error retrieving publication data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST photo website
router.post("/", upload.single("baby_photo"), async (req, res) => {
  try {
    // Extract data from the request body
    const {
      publication_url,
      user_email,
      user_first_name,
      user_last_name,
      product_id,

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

    // upload image file
    // Access the uploaded image file from the request
    const baby_photo = req.file;

    // Create a readable stream from the uploaded image file
    const readableStream = Readable.from(baby_photo.data);
    // Upload the image to GridFS
    const uploadStream = gridFSBucket.openUploadStream({
      filename: `${publication_url}_baby_photo.jpg`, // Use a unique filename
      contentType: "image/jpeg", // Set the content type
    });
    readableStream.pipe(uploadStream);

    await new Promise((resolve, reject) => {
      uploadStream.on("finish", resolve);
      uploadStream.on("error", reject);
    });
    // end of image file

    // Count the number of publication instances in the database
    const publicationCount = await publicationModel.countDocuments();

    // Calculate the next publication_id
    const nextPublicationId = 100000001 + publicationCount;

    // Create a new Publication instance
    const newPublication = new publicationModel({
      nextPublicationId,
      publication_url,
      user_email,
      user_first_name,
      user_last_name,
      product_id,

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
    await newPublication.save();

    // Send a success response
    res.status(201).json({ message: "Publication created successfully" });
  } catch (error) {
    // Handle errors
    console.error("----------------------------------------------------");
    console.error("Error creating publication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}); //end of POST handler

module.exports = router;
