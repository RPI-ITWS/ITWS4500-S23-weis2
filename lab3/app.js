const express = require('express')
const app = express()

const config = require('./config/app.config')

const pokemonRouter = require('./router/pokemon.router')

app.use(express.static('public'))

app.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// register route
app.use('/', pokemonRouter)

app.listen(config.port)

console.log(`server on: http://localhost:${config.port}`)