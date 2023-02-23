const express = require('express')
const path = require('path')

const { getAllPokemons, getAllTypes } = require('../controller/pokemon.controller')

const router = express.Router()

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'))
})

router.get('/api/v1/pokemon', getAllPokemons)
router.get('/api/v1/pokemon/:name', getAllPokemons)
router.get('/api/v1/type', getAllTypes)
router.get('/api/v1/type/:id', getAllTypes)

// export routing object
module.exports = router
