import db from '../../db/index.js'

export default async function(req, res) {
  try {
    const isExist =  await db.select().from('users').where({ id: req.body.id }).first()
    
    if (!isExist) {
      return res.send({ error: 'An error occurred! Wrong id' })
    }

    const [ user ] = await db('users').where({ id: req.body.id }).update({ deleted: true }).returning([ 'id', 'name', 'login', 'password', 'deleted', 'status', 'contacts', 'created_at', 'updated_at' ])

    res.json({ user })
  } catch (error) {
    res.json({ error })
  }
}