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
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const loginRoute = require("../src/routes/loginRoute");
const publicationRoute = require("../src/routes/publicationRoute");

/*********************************************************************/
/* app */
const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
app.enable("trust proxy");

// CORS setting
const CORSOptions = {
  origin: [
    "*",

    "https://pixely.ca",
    /https:\/\/.*\.pixely.ca$/,

    "http://localhost:3000",
    /http:\/\/.*\.localhost:3000$/,
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(CORSOptions));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      //new
      sameSite: sameSiteValue,
      secure: secureValue,

      //old
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000 * 30, // 30-days
    },
  })
);

// passport initialize
app.use(passport.initialize());
app.use(passport.session());

// body-parser setting
app.use(bodyParser.json({ limit: "16mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "16mb" }));

/*********************************************************************/
/* routes */
app.get("/", (req, res) => {
  res.send({
    message: "welcome to Pixely API.",
  });
});
// login system
app.use("/auth", loginRoute);
// APIs
app.use("/api/publication", publicationRoute);

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
