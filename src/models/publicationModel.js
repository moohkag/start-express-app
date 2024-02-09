// require Mongoose
const mongoose = require("mongoose");

// assign Mongoose schema
const Schema = mongoose.Schema;

const PublicationSchema = new Schema(
  {
    /* metadata */
    publication_id: {
      // 9 combinations of numbers
      type: String,
      required: true,
    },
    publication_url: {
      type: String,
      required: true,
    },
    product_id: {
      //ba1, ba3, wc4, etc.
      type: String,
      required: true,
    },
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

    /* options */
    message_option: {
      type: String,
      required: false,
      default: null,
    },
    donation_option: {
      type: String,
      required: false,
      default: null,
    },

    /* BA */
    baby_first_name: {
      type: String,
      required: false,
    },
    baby_middle_name: {
      type: String || null,
      required: false,
      default: null,
    },
    baby_last_name: {
      type: String,
      required: false,
    },
    baby_birth_date: {
      type: String,
      required: false,
    },
    baby_birth_time: {
      type: String,
      required: false,
    },
    baby_weight: {
      type: String,
      required: false,
    },
    baby_length: {
      type: String,
      required: false,
    },
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
