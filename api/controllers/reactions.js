const helper = require("../utils/common");
const reactionService = require("../services/reactionService");

const changeReaction = async (req, res, next) => {
  try {
    const { article_id, user_id, reaction } = req.body;
    //  Check if any reaction with same user_id and article exists
    const existingReaction = await reactionService.getByArticleUser(
      article_id,
      user_id
    );
    if (existingReaction) {
      const result = await reactionService.update(
        existingReaction.id,
        reaction
      );
      helper.handleResponseWithData(res, 201, result);
    } else {
      const reaction = await reactionService.create(req.body);
      helper.handleResponseWithData(res, 201, reaction);
    }
  } catch (error) {
    helper.handleResponse(res, 500, error);
  }
};

module.exports = { changeReaction };
