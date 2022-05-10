export const up = (knex, Promise) => {
  return knex.schema.createTable('attachments', function(table) {
    table.increments('id').primary()
    table.string('mimetype').notNullable()
    table.string('name').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(null)
  })
}

export const down = (knex, Promise) => {
  return knex.schema.dropTable('attachments')
}