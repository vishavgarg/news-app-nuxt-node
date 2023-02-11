const express = require("express");
const userRoutes = require("./users");
const articleRoutes = require("./articles");
const categoryRoutes = require("./categories");
const reactionRoutes = require("./reactions");
const commentRoutes = require("./comments");

const router = express.Router();

router.use("/user", userRoutes);

router.use("/articles", articleRoutes);

router.use("/categories", categoryRoutes);

router.use("/reactions", reactionRoutes);

router.use("/comments", commentRoutes);

module.exports = router;
