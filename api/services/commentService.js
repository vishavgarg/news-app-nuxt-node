const knex = require("../db");

module.exports = commentService = {
  getByArticleId: async (article_id) => {
    const comments = await knex("comments")
      .join("users", "users.id", "comments.user_id")
      // .join("articles", "articles.id", "comments.article_id")
      .where("comments.article_id", article_id)
      .select("comments.*", "users.name as user_name");
    return comments;
  },
  create: async (comment) => {
    const comments = await knex("comments").insert(comment).returning("*");
    return comments;
  },
  update: async (id, comment) => {
    const comments = await knex("comments")
      .where("id", id)
      .update({
        comment: comment,
      })
      .returning("*");
    return comments;
  },
};
