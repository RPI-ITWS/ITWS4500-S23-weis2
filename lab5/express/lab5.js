const express = require('express');
const app = express();
const port = 3000;
const { MongoClient } = require('mongodb');
const cors = require('cors');
const url = 'mongodb+srv://weis2:W661975501sq@weis2.hqdaic9.mongodb.net/test';
const client = new MongoClient(url);
const db = client.db('pokemons');
const collection = db.collection('data');
// server route handler
// app.get('/', function(req, res) {
//     res.sendFile(__dirname + '/lab3.html');
// });

//middleware
app.use(express.json());
app.use(cors());

app.get('/db/:number', async (req, res) => {
    const { number } = req.params;
    const data = await collection.findOne({ id: +number }, { projection: { _id: 0 } })

    res.status(200).send({
        data
    });
});


app.post('/db', async (req, res) => {
    const data = req.body;

    const last = await collection.find({}).sort({ id: -1 }).limit(1).toArray()
    data['id'] = (+last[0].id || 0) + 1;
    await collection.insertOne(data);

    res.status(200).send({
        data: data
    });

});

app.put('/db/:number', async (req, res) => {
    const { number } = req.params;
    const data = req.body;
    delete data.id;
    delete data._id;

    await collection.updateOne({ id: +number }, { $set: data });

    res.status(200).send({
        data: { ...data, id: +number }
    });
});


app.delete('/db/:number', async (req, res) => {
    const { number } = req.params;
    await collection.findOneAndDelete({ id: +number });

    res.status(200).send({
        data: number
    });
});


app.listen(port, () => {
    console.log('Listening on :3000')
});
