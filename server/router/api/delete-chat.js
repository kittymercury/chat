import db from '../../db/index.js'

export default async function(req, res) {
  try {
    const count = await db('chats').where('id', req.body.id).del()
    await db('participants').where('chat_id', req.body.id).del()
    await db('messages').where('chat', req.body.id).del()

    res.json({ deleted: !!count })
  } catch (error) {
    res.json({ error })
  }
}