const express = require("express");
const passport = require("../utils/local");
const router = express.Router();
const articleController = require("../controllers/articles");

router.get("/all", articleController.getAll);

router.get(
  "/user",
  passport.authenticate("jwt", { session: false }),
  articleController.getByUserId
);

router.get("/category/:id", articleController.getByCategoryId);

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  articleController.create
);

router.post("/details/:id", articleController.getByArticleId);

router.put(
  "/update",
  passport.authenticate("jwt", { session: false }),
  articleController.update
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  articleController.deleteArticle
);

module.exports = router;
