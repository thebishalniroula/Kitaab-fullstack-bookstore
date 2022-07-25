const User = require("../models/User");
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  "user",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const userDB = await User.findOne({ email });
        if (userDB) {
          const isValid = await bcrypt.compare(password, userDB.password);
          if (isValid) {
            console.log("user validated");
            return done(null, userDB);
          } else return done(null, false);
        } else return done(null, false);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
passport.use(
  "admin",
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      try {
        const adminDB = await Admin.findOne({ email });
        if (adminDB) {
          const isValid = await bcrypt.compare(password, adminDB.password);
          if (isValid) {
            console.log("Admin validated");
            return done(null, adminDB);
          } else return done(null, false);
        } else return done(null, false);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

//Serialing user
passport.serializeUser((user, done) => {
  console.log("Serializing user...");
  done(null, { id: user.id, role: user.isAdmin ? "admin" : "user" });
});

//Deserializing user
passport.deserializeUser(async ({ id, role }, done) => {
  try {
    if (role === "user") {
      const user = await User.findById(id);
      done(null, user);
    } else {
      const user = await Admin.findById(id);
      done(null, user);
    }
  } catch (error) {
    done(error, false);
  }
});
