#! /usr/bin/env node
const express = require('express')
const webpack = require('webpack')
const dev = require('webpack-dev-middleware')
const path = require('path')
const settings = require('./config')
const config = require('./webpack.config')

const app = express()

const compiler = webpack(config)
// Recompile files on source change
app.use(dev(compiler, {}))

const INDEX_PAGE = path.resolve(__dirname, 'index.html')
app.get('/', function(req, res) {
  res.sendFile(INDEX_PAGE)
})
app.use(express.static('dist'))
app.use(express.static('data'))
app.use(express.static('node_modules/leaflet/dist/'))
app.use('assets', express.static('assets'))

const PORT = settings.PORT
const HOSTNAME = settings.HOSTNAME

app.listen(PORT, HOSTNAME, function(error) {
  if (error) console.error(error)
  else console.log('Dev server started at http://' + HOSTNAME + ':' + PORT)
})
