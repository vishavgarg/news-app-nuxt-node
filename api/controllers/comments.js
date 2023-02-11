const helper = require("../utils/common");
const commentService = require("../services/commentService");

const getByArticleId = async (req, res, next) => {
  try {
    const comment = await commentService.getByArticleId(req.params.id);
    helper.handleResponseWithData(res, 201, comment);
  } catch (error) {
    helper.handleResponse(res, 500, error);
  }
};

const create = async (req, res, next) => {
  try {
    const comment = await commentService.create(req.body);
    helper.handleResponseWithData(res, 201, comment);
  } catch (error) {
    helper.handleResponse(res, 500, error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id, comment } = req.body;
    const result = await commentService.update(id, comment);
    helper.handleResponseWithData(res, 201, result);
  } catch (error) {
    helper.handleResponse(res, 500, error);
  }
};

module.exports = { getByArticleId, create, update };
