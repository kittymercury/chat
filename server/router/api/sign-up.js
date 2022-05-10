import db from '../../db/index.js'

export default async function(req, res) {
  try {
    const isExist = await db.select().from('users').where({ login: req.body.login }).first()
    
    if (isExist) {
      return res.json({ error: 'User with such login already exists' })
    }
    
    const [ user ] = await db('users').insert({
      login: req.body.login,
      password: req.body.password,
      name: req.body.name
    }).returning(['id', 'name', 'login', 'password', 'deleted', 'status', 'contacts', 'created_at', 'updated_at'])

    res.json({ user })
  } catch (error) {
    res.json({ error })
  }
}