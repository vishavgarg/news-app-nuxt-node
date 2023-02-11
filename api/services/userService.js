const knex = require("../db");

module.exports = userService = {
  getAll: async () => {
    const users = await knex("users");
    return users;
  },
  getByEmail: async (email) => {
    const user = await knex("users").where({ email }).first();
    return user;
  },
  getById: async (id) => {
    const user = await knex("users").where("id", id).first();
    return user;
  },
  create: async (user) => {
    const users = await knex("users").insert(user).returning(['name', 'email']);
    return users;
  },
  update: async (id, user) => {
    const users = await knex("users").where("id", id).update({
      name: user.name,
      email: user.email,
    });
    return users;
  },
  updatePassword: async (id, password) => {
    const user = await knex("users").where("id", id).update({
      password,
    });
    return user;
  },
  delete: async (id) => {
    const users = await knex("users").where("id", id).del();
    return users;
  },
};
