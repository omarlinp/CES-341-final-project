const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./model/db'); // Import the MongoDB connection module

const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

dotenv.config();
const port = process.env.PORT || 7000;
const app = express();

//oauth constants
const session = require('express-session');
const passport = require('./helpers/auth');
app.use(session({secret:'cats'}));
app.use(passport.initialize());
app.use(passport.session());

app
    .use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes/routes'))
    .use('/login', require('./routes/login'))
    ;

    

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