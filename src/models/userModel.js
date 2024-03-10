// require Mongoose
const mongoose = require("mongoose");

// assign Mongoose schema
const Schema = mongoose.Schema;

const userModel = new Schema(
  {
    // user
    user_first_name: {
      type: String,
      required: true,
    },
    user_last_name: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
    },

    //method
    login_method: {
      login_provider: {
        type: String,
        required: true,
        default: "Manual",
      },
      login_id: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// mongoose.model(<CollectionName>, <CollectionSchema>);
module.exports = mongoose.model("users", userModel);
