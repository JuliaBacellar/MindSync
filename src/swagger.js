const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuração do swagger-jsdoc
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MindSync API',
      version: '1.0.0',
      description: 'Documentação da API dos psicólogos e pacientes do MindSync',
    },
    servers: [
      {
        url: 'http://localhost:3000', // pode mudar se for deployar depois
      },
    ],
  },
  apis: ['./src/routes/*.js'], // onde ele vai buscar as anotações das rotas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
