const express = require('express');
const axios = require('axios');
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.post('/university/*', async (req, res) => {
    const request = {
        protocol: req.protocol,
        host: req.hostname,
        port: req.port,
        path: req.path,
        query: req.query,
        headers: req.headers,
        url: req.originalUrl,
    };
    const urlParts = request.url.split("/");
    const nameIndex = 2;
    const name = urlParts[nameIndex];

    let university = '';
    try {
        // Call API to get university information
        const response = await axios.get(`http://universities.hipolabs.com/search?name=${name}`);
        university = response.data[0];
        console.log(response.data)
        if (university == undefined) {
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
    res.json(university);
});
app.listen(3000, () => console.log('Server started on port 3000'));
