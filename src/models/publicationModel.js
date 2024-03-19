// require Mongoose
const mongoose = require("mongoose");

// assign Mongoose schema
const Schema = mongoose.Schema;

// schema
const PublicationSchema = new Schema(
  {
    //
    publication_url: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: false,
    },
    user_display_name: {
      type: String,
      required: false,
    },
    template_id: {
      type: String,
      required: true,
    },
    donation_option: String,

    //
    first_name: String,
    middle_name: String,
    last_name: String,

    date_of_birth: String,
    date_of_passing: String,

    epitaph: String,
    obituary: String,

    photo: String,

    //
    tributes: [
      {
        tribute_id: String,
        published_date: String,
        name: String,
        relationship: String,
        email: String,
        comment: String,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//export
module.exports = mongoose.model("publications", PublicationSchema);
// mongoose.model(<CollectionName>, <CollectionSchema>);
