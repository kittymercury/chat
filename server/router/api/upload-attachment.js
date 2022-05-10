import fs from 'fs'
import mime from 'mime-types'
import Promise  from 'bluebird'

import db from '../../db/index.js'

export default async function(req, res) {
  try {
    console.log(req.files)
    await Promise.each(req.files, async (file) => {
      const [ attachment ] = await db('attachments').insert({
        mimetype: file.mimetype,
        name: file.originalname
      }).returning(['id', 'mimetype'])
  
      const extension = mime.extension(attachment.mimetype)
      const buffer = file.buffer
  
      fs.writeFileSync(`storage/${attachment.id}.${extension}`, buffer)
    })

    res.send('ok')
  } catch (error) {
    res.json({ error })
  }
}