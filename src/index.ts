import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import express, { Router } from 'express';

import swaggerDocs from '#utils/swagger';

dotenvExpand.expand(dotenv.config({ path: '../.env' }));

const app = express();
const port = Number(process.env.PORT) || 8080;

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

const router = Router();
app.use('/api', router);

swaggerDocs(app, port);

app.listen(port, async () => {
  console.log(`NodeJS Test Task API listening on port ${port}`);
});
