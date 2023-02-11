/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("comments", function (table) {
        table.increments("id").primary();
        table.text("comment").notNullable();
        table
          .integer("article_id")
          .unsigned()
          .references("id")
          .inTable("articles")
          .onDelete("CASCADE");
        table
          .integer("user_id")
          .unsigned()
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(knex.fn.now());
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("comments");
};
