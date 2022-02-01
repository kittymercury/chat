const express = require('express');

const records = require('./records.json');

const app = express();
const port = 8080;


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/test', (req, res) => {
  console.log(req.query)
  res.send({ text: 'test test test' })
})

app.get('/records', (req, res) => {
  console.log(req.query)
  if (req.query.model) {
    const result = records[req.query.model];

    if (req.query.id) {
      const record = result.find((r = {}) => r.id === +req.query.id);

      if (record) {
        res.send(record);
      } else {
        res.send(`${req.query.model} not found`)
      }
      console.log({record});

      res.send(record);
    } else {
      res.send(result);
    }
  } else {
    res.send(records);
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
