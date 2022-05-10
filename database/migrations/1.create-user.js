export const up = (knex, Promise) => {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('login').unique().notNullable()
    table.string('password').notNullable()
    table.boolean('deleted').defaultTo(false)
    table.string('status').defaultTo('offline')
    table.specificType('contacts', 'integer ARRAY')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(null)
  })
}

export const down = (knex, Promise) => {
  return knex.schema.dropTable('users');
}