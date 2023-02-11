const knex = require("../db");

module.exports = categoryService = {
  getAll: async () => {
    const categories = await knex("categories").select("*");
    return categories;
  },
  getById: async (id) => {
    const category = await knex("categories").where({ id });
    return category;
  },
  create: async (category) => {
    const categories = await knex("categories").insert(category).returning("*");
    return categories;
  },
  update: async (id, name) => {
    const categories = await knex("categories")
      .where("id", id)
      .update({
        name,
      })
      .returning("*");
    return categories;
  },
  delete: async (id) => {
    const categories = await knex("categories").where("id", id).del();
    return categories;
  },
};
