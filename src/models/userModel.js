// require Mongoose
const mongoose = require("mongoose");

// assign Mongoose schema
const Schema = mongoose.Schema;

// schema
const userModel = new Schema(
  {
    // user
    user_display_name: {
      type: String,
      required: true,
    },
    user_email: String,
    user_picture: String,

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

//export
module.exports = mongoose.model("users", userModel);
// mongoose.model(<CollectionName>, <CollectionSchema>);
