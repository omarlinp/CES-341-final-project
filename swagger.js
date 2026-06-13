const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Game API',
        description: 'API for managing games and users'
    },
    host: 'ces-341-final-project.onrender.com',
    schemes: ['https']
};
const outputFile = './swagger.json';
const endpointsFiles = ['./routes/routes.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);