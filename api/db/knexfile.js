// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "tnews",
      user: "postgres",
      password: "root",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
