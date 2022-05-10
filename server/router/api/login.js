import db from '../../db/index.js'

export default async function(req, res) {
  try {
    const isExist = await db.select().from('users').where({
      login: req.body.login,
      password: req.body.password
    }).first()
    
    if (!isExist) {
      return res.json({ error: 'Wrong credentials, try again' })
    }
    
    const [ user ] = await db('users').where({
      login: req.body.login,
      password: req.body.password
    }).update({ status: 'online' }).returning(['id', 'name', 'login', 'password', 'deleted', 'status', 'contacts', 'created_at', 'updated_at'])

    res.json({ user })
  } catch (error) {
    res.json({ error })
  }
}