// require Mongoose
const mongoose = require("mongoose");

// assign Mongoose schema
const Schema = mongoose.Schema;

const userModel = new Schema(
  {
    user_first_name: {
      type: String,
      required: true,
    },
    user_first_last: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },
    login_method: {
      type: Array,
      required: true,
      default: "Manual",
    },
    memorials: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// mongoose.model(<CollectionName>, <CollectionSchema>);
module.exports = mongoose.model("users", userModel);
