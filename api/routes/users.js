const express = require("express");
const passport = require("../utils/local");
const router = express.Router();
const userController = require("../controllers/users");

router.post("/register", userController.registerUser);

router.post("/login", passport.authenticate("local"), userController.loginUser);

router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  userController.updateUser
);

router.put(
  "/update-password",
  passport.authenticate("jwt", { session: false }),
  userController.updatePassword
);

module.exports = router;
