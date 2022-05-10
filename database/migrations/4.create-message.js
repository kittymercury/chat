export const up = (knex, Promise) => {
  return knex.schema.createTable('messages', function(table) {
    table.increments('id').primary()
    table.integer('user').notNullable()
    table.integer('chat').notNullable()
    table.text('content').notNullable()
    table.boolean('edited').defaultTo(false)
    table.boolean('seen').defaultTo(false)
    table.integer('forward_to').defaultTo(null)
    table.integer('reply_to').defaultTo(null)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(null)
  })
}

export const down = (knex, Promise) => {
  return knex.schema.dropTable('messages');
}