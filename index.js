/* requires */
const express = require("express");
const mongoose = require("mongoose");
const createRoute = require("./src/routes/createRoute");

/* app */
const app = express();

/*  */
app.get("/", (req, res) => {
  res.send({ message: "welcome to Pixely API." });
});

app.use("/api/create/", createRoute);
app.use("/api/products/", productsRoute);
// app.use("/api/users/", createRoute);

/* Connections */
mongoose.connect(process.env.MONGODB_URI).catch((error) => {
  console.log("MongoDB failed to connect.");
});
app.listen(process.env.PORT || 4000, (error) => {
  console.log("listening to port 4000, PORT:", process.env.PORT);
});
