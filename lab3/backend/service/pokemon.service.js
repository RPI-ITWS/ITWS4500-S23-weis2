const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path')

const writeFileSyncIfNotExists = data => {
  const p = `${path.resolve(__dirname, '../json')}/${new Date().getTime()}.json`
  fs.writeFile(p, JSON.stringify(data), err => {
    if (!err) {
      return Promise.resolve()
    } else {
      return Promise.reject(err)
    }
  })
}

const getPokemonByUrls = async urls => {
  const resut = await Promise.all(
    urls.map(async url => {
      const response = await fetch(url)
      const res = await response.json()
      return res
    })
  )
  const res = resut.map(item => {
    return {
      name: item.name,
      image: item.sprites.front_default,
      id: item.id,
      type: item.types.map(item => item.type.name)
    }
  })

  await writeFileSyncIfNotExists(res)
  return res
}

class PokemonService {
  async getPokemons(name) {
    try {
      let url = 'https://pokeapi.co/api/v2/pokemon-form'
      if (name) {
        url = `https://pokeapi.co/api/v2/pokemon-form/${name}`
      }
      const response = await fetch(url)
      const data = await response.json()
      if (name) {
        const res = [
          {
            name: data.name,
            image: data.sprites.front_default,
            id: data.id,
            type: data.types.map(item => item.type.name)
          }
        ]
        writeFileSyncIfNotExists(res)
        return res
      }
      const urls = data.results.map(item => item.url)
      return await getPokemonByUrls(urls)
    } catch (err) {
      console.log('err', err)
      return []
    }
  }

  async getTypes() {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/type')
      const { results } = await response.json()
      const res = results.map(item => {
        return {
          name: item.name,
          id: item.url.split('/').slice(-2)[0]
        }
      })
      return res
    } catch (err) {
      console.log('err', err)
      return []
    }
  }

  async getPokemonByTypeId(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/type/${id}`)
    const { pokemon } = await response.json()
    const urls = pokemon.map(item => item.pokemon.url.replace('pokemon', 'pokemon-form'))
    return await getPokemonByUrls(urls)
  }
}

module.exports = new PokemonService()
