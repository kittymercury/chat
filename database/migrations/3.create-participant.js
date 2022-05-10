export const up = (knex, Promise) => {
  return knex.schema.createTable('participants', function(table) {
    table.increments('id').primary()
    table.integer('user_id').notNullable()
    table.integer('chat_id').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(null)
  })
}

export const down = (knex, Promise) => {
  return knex.schema.dropTable('participants');
}