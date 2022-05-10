import lodash from 'lodash'

import db from '../../db/index.js'

export default async function(req, res) {
  try {
    const attributes = {
      ...lodash.omit(req.body, [ 'id' ]),
      updated_at: new Date()
    }

    const [ message ] = await db('messages').where({ id: req.body.id }).update(attributes).returning(['id', 'user', 'chat', 'content', 'seen', 'edited', 'forward_to', 'reply_to', 'created_at', 'updated_at'])
    
    res.json({ message })
  } catch (error) {
    res.json({ error })
  }
}