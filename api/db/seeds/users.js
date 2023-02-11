/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, name: 'Rohit', email: 'rohit@mail.com', password: '12345'},
    {id: 2, name: 'Garry', email: 'garry@mail.com', password: '12345'},
    {id: 3, name: 'John', email: 'john@mail.com', password: '12345'}
  ]);
};
