const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const dotenv = require("dotenv");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
require("./strategies/local");

const app = express();

dotenv.config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(flash());
//Enabling body parsing
app.use(express.json());

//Passport setup
app.use(passport.initialize());
app.use(passport.session());

//Connecting to DB
require("./helper/config").connectdb(mongoose);

//handling user routes
app.use("/api/auth/user/register", require("./routes/auth/user/register"));
app.use("/api/auth/user/login", require("./routes/auth/user/login"));
app.use("/api/auth/user/logout", require("./routes/auth/user/logout"));

//handling admin login routes
app.use("/api/auth/admin/login", require("./routes/auth/admin/login"));

//handling dashboard route
app.use("/api/dashboard", require("./routes/dashboard"));

//Starting server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
