const express = require('express')

const { getAllPokemons, getAllTypes } = require('../controller/pokemon.controller')

const router = express.Router()

router.get('/pokemon', getAllPokemons)
router.get('/pokemon/:name', getAllPokemons)
router.get('/type', getAllTypes)
router.get('/type/:id', getAllTypes)

// Export the route object
module.exports = router
