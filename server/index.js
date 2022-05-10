import express from 'express'

import router from './router/index.js'

const app = express()

app.use(express.json())
app.use('/api', router)
app.use('/storage', express.static('storage'))

app.listen(8080, () => {
  console.log('server started on port 8080')
})