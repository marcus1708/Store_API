const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Market API',
      version: '1.0.0',
      description: 'Documentação da API Market',
    },
    servers: [{ url: 'http://localhost:3333' }],
  },
  // Note o caminho: ele sobe um nível e entra em routes
  apis: ['./src/routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;