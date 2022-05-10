import db from '../../db/index.js'

export default async function(req, res) {
  try {
    const [ message ] = await db('messages').insert({
      user: req.body.user,
      chat: req.body.chat,
      content: req.body.content,
      forward_to: req.body.forward_to || null,
      reply_to: req.body.reply_to || null
    }).returning(['id', 'user', 'chat', 'content', 'edited', 'seen', 'forward_to', 'reply_to', 'created_at', 'updated_at'])

    res.json({ message })
  } catch (error) {
    res.json({ error })
  }
}