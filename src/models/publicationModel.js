// require Mongoose
const mongoose = require("mongoose");

// assign Mongoose schema
const Schema = mongoose.Schema;

const PublicationSchema = new Schema(
  {
    publication_url: {
      type: String,
      required: true,
    },

    /* user info */
    user_email: {
      type: String,
      required: true,
    },
    user_first_name: {
      type: String,
      required: true,
    },
    user_last_name: {
      type: String,
      required: true,
    },

    /* template */
    template_id: {
      type: String,
      required: true,
    },
    message_option: String,
    donation_option: String,

    /* BA */
    baby_first_name: String,
    baby_middle_name: String,
    baby_last_name: String,
    baby_birth_date: String,
    baby_birth_time: String,
    baby_weight: String,
    baby_length: String,
    baby_photo: String,

    /* GN */

    /* TJ */

    /* WC */
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// mongoose.model(<CollectionName>, <CollectionSchema>);
module.exports = mongoose.model("publications", PublicationSchema);
