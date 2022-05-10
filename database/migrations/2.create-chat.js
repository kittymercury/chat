export const up = (knex, Promise) => {
  return knex.schema.createTable('chats', function(table) {
    table.increments('id').primary()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(null)
  })
}

export const down = (knex, Promise) => {
  return knex.schema.dropTable('chats');
}