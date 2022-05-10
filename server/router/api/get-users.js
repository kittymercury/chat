import db from '../../db/index.js'

export default async function(req, res) {
  try {
    const users = await db.select().from('users').where({ deleted: false })

    res.json(users)
  } catch (error) {
    res.json({ error })
  }
}