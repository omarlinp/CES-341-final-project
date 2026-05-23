const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Game API',
        description: 'API for managing games and users'
    },
    host: 'localhost:3000',
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./controller/routes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);