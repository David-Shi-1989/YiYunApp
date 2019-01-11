const express = require('express')
const path = require('path')
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express()



app.use(express.static(path.join(__dirname, '../static')))

app.get('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  var headerContentType = ''
  if (req.url.endsWith('js')) {
    headerContentType = 'application/javascript'
  } else if (req.url.endsWith('css')) {
    headerContentType = 'text/css'
  } else if (req.url.endsWith('mp3') || req.url.endsWith('aac') || req.url.endsWith('m4a')) {
    headerContentType = 'audio/' + req.url.slice(req.url.length - 3)
  } else {
    headerContentType = 'application/json;charset=utf-8'
  }
  res.header('Content-Type', headerContentType)
  next()
})
app.use('/static', express.static('static'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// app.get(['/', '/index.html'], (req, res, next) => {
//   const filename = path.join(DIST_DIR, 'index.html')
//   compiler.outputFileSystem.readFile(filename, function (err, result) {
//     if (err) {
//       return next(err)
//     }
//     res.header('Content-Type', 'text/html; charset=UTF-8')
//     res.send(result)
//     res.end()
//   })
// })
app.listen(80, () => {
  console.log('App listening on port 80')
})
