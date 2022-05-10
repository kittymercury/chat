import * as Connections from './connections.js'

process.on('uncaughtException', (error) => console.error(error));
process.on('unhandledRejection', (error) => console.error(error));

async function setup() {
  const { rows } = await Connections.system.raw(`
    SELECT * FROM pg_database WHERE datname = '${process.env.DB_NAME}'
  `)

  if (rows.length) {
    console.log(`Database '${process.env.DB_NAME}' exists`);
  } else {
    await Connections.system.raw(`CREATE DATABASE ${process.env.DB_NAME}`)
    console.log(`Database '${process.env.DB_NAME}' created`)
  }

  await Connections.custom.migrate.latest()
  console.log('migrated')
  await Connections.custom.seed.run()
  console.log('seeded')
}

setup()