/* requires */
if (process.env.DOTENV === undefined) {
  require("dotenv").config();
}
// ["https://pixely.ca", "http://localhost:3000"]
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
// const session = require("express-session");
// const passport = require("passport");

const publicationRoute = require("./src/routes/publicationRoute");
// const productRoute = require("./src/routes/productRoute");
// const loginRoute = require("./src/routes/loginRoute");

/*********************************************************************/
/* app */
const app = express();

// CORS setting
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

// cookie session setting
// app.use(
//   session({
//     secret: "Pixely session secret",
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false },
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

// body-parser setting
app.use(bodyParser.json({ limit: "16mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "16mb" }));

/*********************************************************************/
/* routes */
app.get("/", (req, res) => {
  res.send({
    message: "welcome to Pixely API.",
    connection: process.env.MONGODB_URI,
  });
});
app.use("/api/publication", publicationRoute);
// app.use("/api/product/", productRoute);
// app.use("/auth", loginRoute);

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
  mongoose.connect(process.env.MONGODB_URI).catch((error) => {
    console.log("MongoDB failed to connect.", error);
  });
}
app.listen(process.env.PORT || 4000, (error) => {
  console.log("listening to port 4000.");
});
