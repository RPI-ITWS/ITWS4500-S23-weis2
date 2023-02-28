// Import required modules
const express = require('express');
const axios = require('axios');
const path = require("path");
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle POST requests
app.post('/university', async (req, res) => {
    console.log(req.body)
    const { name } = req.body;
    let university='';
    try {
        // Call API to get university information
        const response = await axios.get(`http://universities.hipolabs.com/search?name=${name}`);
        university = response.data[0];

        if(university==undefined){
            // If the API returns an error, return the information of the RPI
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

// Listen on port 3000
app.listen(3000, () => console.log('Server started on port 3000'));
