/* requires */
const express = require("express");
const mongoose = require("mongoose");
const createRoute = require("./src/routes/createRoute");
if (process.env.DOTENV === undefined) {
  require("dotenv").config();
}

/* app */
const app = express();

/* routes */
app.get("/", (req, res) => {
  res.send({ message: "welcome to Pixely API." });
});

app.use("/api/create/", createRoute);
// app.use("/api/products/", productsRoute);
// app.use("/api/users/", usersRoute);

/* Connections */
mongoose.connect(process.env.MONGODB_URI).catch((error) => {
  console.log("MongoDB failed to connect.");
});
app.listen(process.env.PORT || 4000, (error) => {
  console.log("listening to port 4000, PORT:", process.env.PORT);
});
