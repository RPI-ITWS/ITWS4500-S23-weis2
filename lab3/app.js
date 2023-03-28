const express = require('express')
const app = express()

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

app.listen(3000, () => (
  console.log("Server is running on port 3000.")
));