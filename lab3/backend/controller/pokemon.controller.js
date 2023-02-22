const { getPokemons, getTypes, getPokemonByTypeId } = require('../service/pokemon.service')

class PokemonController {
  async getAllPokemons(req, res) {
    try {
      const { name } = req.params
      const pokemons = await getPokemons(name)
      return res.send({
        code: 200,
        data: pokemons
      })
    } catch (error) {
      console.log('error', error)
    }
  }
  async getAllTypes(req, res) {
    let result = []
    const { id } = req.params
    if (id) {
      result = await getPokemonByTypeId(id)
    } else {
      result = await getTypes()
    }
    return res.send({
      code: 200,
      data: result
    })
  }
}

module.exports = new PokemonController()
