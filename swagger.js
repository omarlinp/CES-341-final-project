const swaggerAutogen = require('swagger-autogen')();
const dotenv = require('dotenv');

dotenv.config();

const doc = {
    info: {
        title: 'Game API',
        description: 'API for managing games and users'
    },
    host: process.env.NODE_ENV === 'production' ? 'ces-341-final-project.onrender.com' : 'localhost:5555',
    schemes: process.env.NODE_ENV === 'production' ? ['https'] : ['http']
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/routes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);