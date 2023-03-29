const express = require('express');
const axios = require('axios');
const path = require("path");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/university', async (req, res) => {

    const { name } = req.body;
    let university='';
    try {
        const response = await axios.get(`http://universities.hipolabs.com/search?name=${name}`);
        university = response.data[0];

        if(university==undefined){
            university = {
                name: 'Rensselaer Polytechnic Institute',
                country: 'United States',
                alpha_two_code: 'US',
                web_pages: ['http://www.rpi.edu/'],
            };
        }

    } catch (error) {
        university = {
            name: 'Rensselaer Polytechnic Institute',
            country: 'United States',
            alpha_two_code: 'US',
            web_pages: ['http://www.rpi.edu/'],
        };
    }
    console.log(university)
    res.json(university);
});

app.listen(3000, () => console.log('Server started on port 3000'));
