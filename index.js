/*********************************/
/* requires */
if (process.env.DOTENV === undefined) {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
// const session = require("express-session");
// const passport = require("passport");
const cors = require("cors");
// const GoogleStrategy = require("./src/auths/googleAuth");

// const productRoute = require("./src/routes/productRoute");
const publicationRoute = require("./src/routes/publicationRoute");
// const loginRoute = require("./src/routes/loginRoute");

/*********************************/
/* app */
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CLIENT_URL = "http://localhost:3000/";
// const CLIENT_URL = "*";
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

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

/*********************************/
/* routes */
app.get("/", (req, res) => {
  res.send({ message: "welcome to Pixely API." });
});
// app.use("/api/product/", productRoute);
app.use("/api/publication", publicationRoute);
// app.use("/auth", loginRoute);

/*********************************/
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
    console.log("MongoDB failed to connect.");
  });
}
app.listen(process.env.PORT || 4000, (error) => {
  console.log("listening to port 4000.");
});
