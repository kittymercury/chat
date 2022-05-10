import Promise from 'bluebird'

import db from '../../db/index.js'

export default async function(req, res) {
  try {
    const [ chat ] = await db('chats').insert({}).returning(['id'])
    await Promise.each(req.body.participants, async (p) => {
      await db('participants').insert({
        chat_id: chat.id,
        user_id: p
      })
    })

    res.json({ chat: {
      id: chat.id,
      participants: req.body.participants,
    }})
  } catch (error) {
    res.json({ error })
  }
}