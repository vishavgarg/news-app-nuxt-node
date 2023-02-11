const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const init = require("./passport");
const knex = require("../db");
const helper = require("./common");
require("dotenv").config();
init();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.TOKEN_SECRET;

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    const user = await knex("users").where({ email }).first();

    if (!user) return done(null, false, { message: "Incorrect Username" });
    if (!helper.comparePass(password, user.password)) {
      return done(null, false, { message: "Incorrect password" });
    }
    return done(null, user);
  })
);

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    done(null, jwt_payload);
  })
);
module.exports = passport;
