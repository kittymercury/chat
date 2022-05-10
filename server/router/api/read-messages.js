import db from '../../db/index.js'

export default async function(req, res) {
  try {
    const [ messages ] = await db('messages').whereNot({ user: req.body.user }).andWhere({ chat: req.body.chat }).update({ seen: true }).returning(['id', 'user', 'chat', 'content', 'seen', 'edited', 'forward_to', 'reply_to', 'created_at', 'updated_at'])
      
    res.json({ messages })
  } catch (error) {
    res.json({ error })
  }
}