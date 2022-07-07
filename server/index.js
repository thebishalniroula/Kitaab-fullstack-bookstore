const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
require("./strategies/local");

const app = express();

dotenv.config();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.DB_CONNECTION_STRING,
      collectionName: "sessionStorage",
    }),
  })
);
app.use(cookieParser(process.env.SESSION_SECRET));
//Enabling body parsing
app.use(express.json());

//Passport setup
app.use(passport.initialize());
app.use(passport.session());

//Connecting to DB
require("./db/connection").connectdb(mongoose);

//handling user routes
app.use("/api/auth/user/register", require("./routes/auth/user/register"));
app.use("/api/auth/user/login", require("./routes/auth/user/login"));
app.use("/api/auth/user/logout", require("./routes/auth/user/logout"));

//handling admin login routes
app.use("/api/auth/admin/login", require("./routes/auth/admin/login"));
app.use("/api/auth/admin/logout", require("./routes/auth/admin/logout"));

//handling dashboard route
app.use("/api/dashboard/user", require("./routes/dashboard/user"));
app.use("/api/dashboard/admin", require("./routes/dashboard/admin"));

//handling books api
app.use("/api/books/", require("./routes/api/books"));

//adding, removing, editing books
app.use("/api/books/admin", require("./routes/api/editBooks"));

//cart
app.use("/api/cart", require("./routes/api/cart"));

//Starting server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});
