const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'My API',
        description: 'API Description',
    },
    host: 'localhost:5000',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['../server.js'];

// Generate swagger.json file
swaggerAutogen(outputFile, endpointsFiles, doc);
