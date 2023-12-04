// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0', // Especificación de OpenAPI
    info: {
      title: 'API de Cálculo de Préstamo',
      version: '1.0.0',
      description: 'Una API para calcular préstamos basados en precios de materiales.',
    },
  },
  apis: ['Index.js'], // Especifica aquí el nombre del archivo principal que contiene tus rutas
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec, swaggerUi };
