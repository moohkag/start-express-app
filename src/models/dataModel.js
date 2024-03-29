// require Mongoose
const mongoose = require("mongoose");

// assign Mongoose schema
const Schema = mongoose.Schema;

// schema
const userModel = new Schema({
  user_display_name: {
    type: String,
    required: true,
  },
  user_email: String,
});

//export
module.exports = mongoose.model("users", userModel);
// mongoose.model(<CollectionName>, <CollectionSchema>);
