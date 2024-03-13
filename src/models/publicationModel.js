// require Mongoose
const mongoose = require("mongoose");
const TributeModel = require("./tributeModel");

// assign Mongoose schema
const Schema = mongoose.Schema;

// schema
const PublicationSchema = new Schema(
  {
    publication_url: {
      type: String,
      required: true,
    },

    //user
    owner_email: {
      type: String,
      required: true,
    },
    owner_first_name: {
      type: String,
      required: true,
    },
    owner_last_name: {
      type: String,
      required: true,
    },
    //end of user

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
    tributes: [TributeModel],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//export
module.exports = mongoose.model("publications", PublicationSchema);
// mongoose.model(<CollectionName>, <CollectionSchema>);
