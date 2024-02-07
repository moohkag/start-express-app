/*********************************/
/* requires */
if (process.env.DOTENV === undefined) {
  require("dotenv").config();
}
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const notWorking = require("./src/auths/googleAuth");

// const productRoute = require("./src/routes/productRoute");
const userRoute = require("./src/routes/userRoute");
const loginRoute = require("./src/routes/loginRoute");

/*********************************/
/* app */
const app = express();

const CLIENT_URL = "http://localhost:3000/";
const corsOptions = {
  origin: CLIENT_URL,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));

app.use(
  session({
    secret: "Pixely session secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

/*********************************/
/* routes */
app.get("/", (req, res) => {
  res.send({ message: "welcome to Pixely API." });
});
// app.use("/api/product/", productRoute);
app.use("/api/user", userRoute);
app.use("/auth", loginRoute);

/*********************************/
/* Connections */
mongoose.connect(process.env.MONGODB_URI).catch((error) => {
  console.log("MongoDB failed to connect.");
});
app.listen(process.env.PORT || 4000, (error) => {
  console.log("listening to port 4000");
});
