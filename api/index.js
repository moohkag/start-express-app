/* requires */
let sameSiteValue = "none";
let secureValue = true;
if (process.env.DOTENV === undefined) {
  require("dotenv").config();
  sameSiteValue = "strict";
  secureValue = false;
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

/*********************************************************************/
/* app */
const app = express();

// CORS setting
const CORSOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: "include",
};
app.use(cors(CORSOptions));

/*********************************************************************/
/* routes */
app.get("/", (req, res) => {
  res.send({
    message: "Welcome",
  });
});

/*********************************************************************/
/* Connections */
if (process.env.DOTENV === undefined) {
  mongoose
    .connect(process.env.MONGODB_URI_TEST)
    .then(() => {
      console.log("Connected to test database.");
    })
    .catch((error) => {
      console.log("MongoDB failed to connect.");
    });
} else {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to real database.");
    })
    .catch((error) => {
      console.log("MongoDB failed to connect.", error);
    });
}
app.listen(process.env.PORT || 4000, (error) => {
  console.log("listening to port 4000.");
});
