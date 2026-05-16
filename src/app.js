require('dotenv').config();

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const routes = require('./routes');

const app = express();

app.use(express.json());

/* ---------------- SWAGGER ---------------- */

const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* ---------------- ROTAS ---------------- */

app.use(routes);

module.exports = app;