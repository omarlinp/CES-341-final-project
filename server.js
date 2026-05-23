const dotnev = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./model/db'); // Import the MongoDB connection module

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

dotnev.config();
const port = process.env.PORT || 3000;
const app = express();

app
    .use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./controller/routes'));


mongodb.connectToDatabase((err) => {
    if (err) {
        console.error('Failed to connect to database', err);
    } else {
        console.log('Connected to database');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
});