import Promise from 'bluebird'

import db from '../../db/index.js'

export default async function(req, res) {
  try {
    const currentUserParticipants = await db.select().from('participants').where({ user_id: req.body.id })
    const currentUserChatIds = currentUserParticipants.map((p) => p.chat_id)
    const currentUserChats = await db.select().from('chats').whereIn('id', currentUserChatIds)
    const participants = await db('participants').whereIn('chat_id', currentUserChatIds)

    const chats = await Promise.map(currentUserChats, (chat) => {
      const chatParticipants = participants.filter((p) => p.chat_id === chat.id)

      return {
        id: chat.id,
        participants: chatParticipants.map((p) => p.user_id)
      }
    })

    res.json({ chats })
  } catch (error) {
    res.json({ error })
  }
}