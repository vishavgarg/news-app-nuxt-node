const knex = require("../db");

module.exports = reactionService = {
  getByArticleUser: async (article_id, user_id) => {
    const reaction = await knex("reactions")
      .where({
        article_id,
        user_id,
      })
      .first();
    return reaction;
  },
  getByArticleId: async (article_id) => {
    const reactions = await knex("reactions").where({
      article_id,
      reaction: "like",
    });
    return reactions;
  },
  create: async (reaction) => {
    const reactions = await knex("reactions").insert(reaction).returning("*");
    return reactions;
  },
  update: async (id, reaction) => {
    const reactions = await knex("reactions")
      .where("id", id)
      .update({
        reaction: reaction,
      })
      .returning("*");
    return reactions;
  },
};
