const express = require("express");
const router = express.Router();
const reactionController = require("../controllers/reactions");

router.post("/change-reaction", reactionController.changeReaction)

module.exports = router;
