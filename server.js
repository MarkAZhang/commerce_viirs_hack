#! /usr/bin/env node
const express = require('express')
const path = require('path')
const settings = require('./config')

const app = express()

const INDEX_PAGE = path.resolve(__dirname, 'index.html')
app.get('/', function(req, res) {
  res.sendFile(INDEX_PAGE)
})
app.use(express.static('dist'))
app.use(express.static('data'))

const PORT = settings.PORT
const HOSTNAME = settings.HOSTNAME

app.listen(PORT, HOSTNAME, function(error) {
  if (error) console.error(error)
  else console.log('Dev server started at http://' + HOSTNAME + ':' + PORT)
})
