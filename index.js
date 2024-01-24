/* requires */
const express = require("express");
const mongoose = require("mongoose");

const app = express();

/* Connections */
mongoose.connect("d").catch((error) => {
  console.log("MongoDB not connected");
});
app.listen(process.env.PORT || 4000, (error) => {
  console.log("listening to port 4000");
});
