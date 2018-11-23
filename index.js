const http = require('http')
const path = require('path')
const express = require('express')

const app = new express()
const server = new http.Server(app)
const port = process.env.PORT || 3000

app.get('*.js', function (request, response, next) {
  request.url = request.url + '.gz'
  response.set('Content-Type', 'text/javascript')
  response.set('Content-Encoding', 'gzip')
  next()
})

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/index.html'))
})

app.use('/app', express.static('app'))

server.listen(port, '0.0.0.0', function() {
  console.log(`\nApplication available at port ${port}\n`)
  setInterval(function() {
    http.get("https://agrovisio-timeseries.herokuapp.com")
  }, 1500000); // Ping every 25 minutes
})