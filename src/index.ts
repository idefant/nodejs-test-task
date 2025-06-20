import cors from 'cors';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import express, { Router } from 'express';

import { errorHandlerMiddleware } from '#middlewares/errorHandlerMiddleware';
import authRouter from '#routes/authRouter';
import bookingsRouter from '#routes/bookingsRouter';
import roomsRouter from '#routes/roomsRouter';
import swaggerDocs from '#utils/swagger';

dotenvExpand.expand(dotenv.config({ path: '../.env' }));

const app = express();
const port = Number(process.env.PORT) || 8080;

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

const router = Router();
router.use('/rooms', roomsRouter);
router.use('/bookings', bookingsRouter);
router.use('/auth', authRouter);
app.use('/api', router);

swaggerDocs(app, port);

app.use(errorHandlerMiddleware);

app.listen(port, async () => {
  console.log(`NodeJS Test Task API listening on port ${port}`);
});
