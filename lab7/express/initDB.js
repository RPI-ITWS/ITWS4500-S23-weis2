const axios = require('axios');
const { MongoClient } = require('mongodb');

const url = 'mongodb+srv://weis2:W661975501sq@weis2.hqdaic9.mongodb.net/test';
const client = new MongoClient(url);

const store = async (index) => {

    var api = "https://pokeapi.co/api/v2/pokemon/" + index;
    // api = api + name;
    // api = api + "&units=metric&APPID=611e87ccd437ffe008e2daca74b0c1e5";

    const response = await axios.get(api);
    return response.data;
}
async function main() {
    await client.connect();
    const db = client.db('pokemons');
    const collection = db.collection('data');
    let res = []
    for (let i = 1; i <= 1010; i++) {
        await store(i)
            .then((data) => {
                res.push(data)
            }).catch((err) => {
                console.log(err)
            })
    }

    res = res.map((w, index) => {

        return {
            id: index + 1,
            name: w.name,
            abilities: w.abilities.map(a => a.ability.name),
            type_1: w.types[0].type.name,
            type_2: w.types[1]?.type.name || null,
            hp: w.stats[0].base_stat,
            attack: w.stats[1].base_stat,
            defense: w.stats[2].base_stat,
            special_attack: w.stats[3].base_stat,
            special_defense: w.stats[4].base_stat,
            speed: w.stats[5].base_stat,
            front: w.sprites.front_default,
            back: w.sprites.back_default,
        }
    })
    await collection.insertMany(res)
    console.log(res)
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
