import fs from 'fs';
import path from 'path';

import swaggerJSDoc from 'swagger-jsdoc';

import { version } from '../package.json';

const swaggerDefinition = {
  openapi: '3.1.0',
  info: {
    title: 'nodejs-test-task',
    version,
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/**/*.ts', './src/schema/*.ts', './src/models/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);
fs.writeFileSync(path.join(__dirname, '../swagger.json'), JSON.stringify(swaggerSpec, null, 2));
