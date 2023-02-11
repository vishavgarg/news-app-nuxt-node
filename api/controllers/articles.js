const articleService = require("../services/articleService");
const reactionService = require("../services/reactionService");
const helper = require("../utils/common");

const getAll = async (req, res, next) => {
  try {
    const dateOrder = req.query.date_order || "asc";
    const articles = await articleService.getAll(dateOrder);
    helper.handleResponseWithData(res, 201, articles);
  } catch (error) {
    helper.handleResponse(res, 500, error);
  }
};

const getByUserId = async (req, res, next) => {
  try {
    const dateOrder = req.query.date_order || "asc";
    const accessType = req.query.access_type === "public" ? true : false;
    const articles = await articleService.getByUserId(
      req.user.id,
      dateOrder,
      accessType
    );
    helper.handleResponseWithData(res, 201, articles);
  } catch (error) {
    helper.handleResponse(res, 500, error);
  }
};

const getByCategoryId = async (req, res, next) => {
  try {
    const dateOrder = req.query.date_order || "asc";
    const articles = await articleService.getByCategoryId(
      req.params.id,
      dateOrder
    );
    helper.handleResponseWithData(res, 201, articles);
  } catch (error) {
    helper.handleResponse(res, 500, error);
  }
};

const getByArticleId = async (req, res, next) => {
  try {
    const article = await articleService.getByArticleId(req.params.id);
    if (article) {
      const reactions = await reactionService.getByArticleId(req.params.id);
      if (req.body.user_id) {
        const userReaction = reactions.find(
          (e) => e.user_id == req.body.user_id
        );
        helper.handleResponseWithData(res, 201, {
          ...article,
          likesCount: reactions.length,
          current_user_reaction: userReaction?.reaction
            ? userReaction.reaction
            : null,
        });
      } else {
        helper.handleResponseWithData(res, 201, {
          ...article,
          likesCount: reactions.length,
        });
      }
    } else {
      helper.handleResponse(res, 401, "Article does not exist");
    }
  } catch (error) {
    helper.handleResponse(res, 500, error);
  }
};

const create = async (req, res, next) => {
  try {
    const body = req.body;
    const user_id = req.user.id;
    const article = await articleService.create({ ...body, user_id });
    helper.handleResponseWithData(res, 201, article);
  } catch (error) {
    helper.handleResponse(res, 500, error);
  }
};

const update = async (req, res, next) => {
  const checkUser = articleService.checkUserArticle(req.body.id, req.user.id);
  if (!checkUser) {
    return helper.handleResponse(res, 401, "You are not authorised");
  } else {
    try {
      const { id } = req.body;
      const article = await articleService.update(id, req.body);
      helper.handleResponseWithData(res, 201, article);
    } catch (error) {
      helper.handleResponse(res, 500, error);
    }
  }
};

const deleteArticle = async (req, res, next) => {
  const checkUser = articleService.checkUserArticle(req.params.id, req.user.id);
  if (!checkUser) {
    return helper.handleResponse(res, 401, "You are not authorised");
  } else {
    try {
      await articleService.delete(req.params.id);
      helper.handleResponse(res, 201, "Article has been deleted");
    } catch (error) {
      helper.handleResponse(res, 500, error);
    }
  }
};

module.exports = {
  getAll,
  getByUserId,
  getByCategoryId,
  getByArticleId,
  create,
  update,
  deleteArticle,
};
