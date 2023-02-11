const helper = require("../utils/common");
const categoryService = require("../services/categoryService");

const getAll = async (req, res, next) => {
  try {
    const categories = await categoryService.getAll();
    helper.handleResponseWithData(res, 201, categories);
  } catch (error) {
    helper.handleResponse(res, 500, error);
  }
};

const getById = async (req, res, next) => {
  try {
    const category = await categoryService.getById(req.params.id);
    helper.handleResponseWithData(res, 201, category);
  } catch (error) {
    helper.handleResponse(res, 500, error);
  }
};

const create = async (req, res, next) => {
  try {
    const category = await categoryService.create(req.body);
    helper.handleResponseWithData(res, 201, category);
  } catch (error) {
    helper.handleResponse(res, 500, error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id, name } = req.body;
    const category = await categoryService.update(id, name);
    helper.handleResponseWithData(res, 201, category);
  } catch (error) {
    helper.handleResponse(res, 500, error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    await categoryService.delete(id);
    helper.handleResponse(res, 201, "Category has been deleted");
  } catch (error) {
    helper.handleResponse(res, 500, error);
  }
};

module.exports = { getAll, getById, create, update, deleteCategory };
