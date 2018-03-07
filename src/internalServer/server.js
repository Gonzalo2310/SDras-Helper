const fileOperation = require('../functions/fileJobs')
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors({ origin: 'http://localhost:8000' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/file', router)

router.get('/read/:file/:current', function ({ params }, res) {
  res.json(fileOperation.ReadData(params.file, params.current))
})

router.post('/store/:current', function ({ body, params }, res) {
  res.json(fileOperation.SaveData(body.file, body.data, params.current))
})

router.post('/create/:project', function ({ params }, res) {
  res.json({ response: fileOperation.CreateDir(params.project) })
})

router.post('/rename/:oldValue/:newValue', function ({ params }, res) {
  res.json({
    response: fileOperation.RenameDir(params.oldValue, params.newValue)
  })
})

router.post('/delete/:name', function ({ params }, res) {
  res.json({ response: fileOperation.DeleteDir(params.name) })
})

router.post('/project/:name', function ({ params }, res) {
  res.json({ response: fileOperation.NewProject(params.name) })
})

app.listen(port)
console.log('API: ' + port)
