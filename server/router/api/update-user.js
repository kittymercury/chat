import lodash from 'lodash'

import db from '../../db/index.js'

export default async function(req, res) {
  try {
    const attributes = {
      ...lodash.omit(req.body, [ 'id' ]),
      updated_at: new Date()
    }

    const [ user ] = await db('users').where({ id: req.body.id }).update(attributes).returning(['id', 'name', 'login', 'password', 'deleted', 'status', 'contacts', 'created_at', 'updated_at'])
    
    res.json({ user })
  } catch (error) {
    res.json({ error })
  }
}