const dotnev = require('dotenv');
const express = require('express');
const mongodb = require('./model/db'); // Import the MongoDB connection module


dotnev.config();
const port = process.env.PORT || 3000;
const app = express();



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