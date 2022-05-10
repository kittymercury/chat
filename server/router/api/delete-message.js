import db from '../../db/index.js'

export default async function(req, res) {
  try {
    const count = await db('messages').where('id', req.body.id).del()

    res.json({ deleted: !!count })
  } catch (error) {
    res.json({ error })
  }
}