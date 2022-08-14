const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
require("./strategies/local");
const path = require("path");

const app = express();
if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config();
}
app.use(
  require("cors")({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
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
console.log(__dirname);
app.use("/images/books", express.static(path.join(__dirname, "images/books")));
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

//handling books api
app.use("/api/books/", require("./routes/api/books"));
//handling reviews api
app.use("/api/reviews/", require("./routes/api/reviews"));

//adding, removing, editing books
app.use("/api/books/admin", require("./routes/api/editBooks"));

//cart
app.use("/api/cart", require("./routes/api/cart"));

//payment
app.use("/api/payment", require("./routes/paymentRoutes/stripe"));

//is logged in?
app.use("/api/isLoggedIn", require("./routes/auth/user/isAuthenticated"));
app.use(
  "/api/admin/isLoggedIn",
  require("./routes/auth/admin/isAuthenticated")
);

//Starting server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port", process.env.PORT || 3000);
});
