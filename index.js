/* requires */
if (process.env.DOTENV === undefined) {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");
// routes
const loginRoute = require("./src/routes/loginRoute");
const publicationRoute = require("./src/routes/publicationRoute");

/*********************************************************************/
/* app */
const app = express();

// CORS setting
const corsOptions = {
  origin: [
    "https://pixely.ca",
    /https:\/\/.*\.pixely.ca$/,

    "http://localhost:3000",
    /http:\/\/.*\.localhost:3000$/,

    "https://pixely-server-f1ba3abe57b4.herokuapp.com/",
    /http:\/\/.*\.herokuapp.com$/,
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  exposedHeaders: ["Set-Cookie"],
};
app.use(cors(corsOptions));

// cookie session setting
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 1000 * 30, // 30-days
    },
  })
);

// app.use(
//   session({
//     name: "pixely_session",
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     httpOnly: false,
//     cookie: {
//       maxAge: 24 * 60 * 60 * 1000 * 30, // 30-days
//       sameSite: "none",
//       secure: false,
//       domain: "pixely-server-f1ba3abe57b4.herokuapp.com",
//       httpOnly: true,
//     },
//   })
// );

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
