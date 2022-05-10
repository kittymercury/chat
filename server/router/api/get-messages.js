import db from '../../db/index.js'

export default async function(req, res) {
  try {
    const messages = await db.select().from('messages').where({ chat: req.body.id })
      
    res.json({ messages })
  } catch (error) {
    res.json({ error })
  }
}