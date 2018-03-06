const fileOperation = require('../functions/fileJobs')
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const router = express.Router()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors({origin: 'http://localhost:8000'}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/file', router)

router.get('/read/:file/:current', function (req, res) {
  let result = fileOperation.ReadData(req.params.file, req.params.current)
  res.json(result)
})

router.post('/store/:current', function (req, res) {
  let result = fileOperation.SaveData(req.body.file, req.body.data, req.params.current)
  res.json(result)
})

router.post('/create/:project', function (req, res) {
  let result = fileOperation.CreateDir(req.params.project)
  res.json({
    'response': result
  })
})

router.post('/rename/:oldValue/:newValue', function (req, res) {
  let result = fileOperation.RenameDir(req.params.oldValue, req.params.newValue)
  res.json({
    'response': result
  })
})

router.post('/delete/:name', function (req, res) {
  let result = fileOperation.DeleteDir(req.params.name)
  res.json({
    'response': result
  })
})

router.post('/project/:name', function (req, res) {
  let result = fileOperation.NewProject(req.params.name)
  res.json({
    'response': result
  })
})

app.listen(port)
console.log('API: ' + port)
