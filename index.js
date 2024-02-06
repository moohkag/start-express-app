/* requires */
const express = require("express");
const mongoose = require("mongoose");
const createRoute = require("./src/routes/createRoute");

const app = express();

app.get("/", (req, res) => {
  res.send({ message: "welcome to Pixely API." });
});
// app.use("/create", createRoute);

/* Connections */
// mongoose.connect("d").catch((error) => {
//   console.log("MongoDB not connected");
// });
app.listen(process.env.PORT || 4000, (error) => {
  console.log("listening to port 4000");
});
