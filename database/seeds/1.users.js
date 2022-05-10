export const seed = async (knex, Promise) => {
  const records = await knex('users').select()
  if (records.length) return

  return knex('users').insert([
    {
      "name": "js",
      "login": "js",
      "password": "js",
      "deleted": false,
      "status": "offline",
      "contacts": null,
    },
    {
      "name": "jd",
      "login": "jd",
      "password": "jd",
      "deleted": false,
      "status": "offline",
      "contacts": null,
    },
    {
      "name": "bob",
      "login": "bob",
      "password": "bob",
      "deleted": false,
      "status": "offline",
      "contacts": null,
    },
    {
      "name": "vi",
      "login": "vi",
      "password": "vi",
      "deleted": false,
      "status": "online",
      "contacts": null,
    }
  ])
}