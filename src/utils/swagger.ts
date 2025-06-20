import fs from 'fs';
import path from 'path';

import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { version } from '../../package.json';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'nodejs-test-task',
      version,
    },
    host: '/',
  },
  apis: ['./src/routes/*.ts', './src/schema/*.ts', './src/models/*.ts'],
};

export function loadSwaggerSpec(): object {
  if (process.env.NODE_ENV === 'production') {
    const swaggerPath = path.resolve(__dirname, '../../../swagger.json');
    if (fs.existsSync(swaggerPath)) {
      return JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));
    }
    console.warn('⚠️ swagger.json не найден в production!');
    return {};
  }

  return swaggerJsdoc(options);
}

const swaggerSpec = loadSwaggerSpec();

function swaggerDocs(app: Express, port: number) {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get('/docs.json', (_req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  // eslint-disable-next-line no-console
  console.info(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;
