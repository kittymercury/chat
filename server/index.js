import express from 'express'

import db from './db/index.js'

const app = express()

app.get('/', (req, res) => {
  res.send('hi')
})

app.get('/api', (req, res) => {
  const action = req.query.action
  console.log(action)
  res.send('dd')
  if (action === 'get_users') {
  //   const model = await p.getModel('tgc_user');
  //   const users = await model.find({ ...payload, deleted: false }).raw();
  
  //   return p.response.json({ users });
  }
})

app.listen(8080, () => {
  console.log('server started on port 8080')
})