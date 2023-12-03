import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { globalErrorHandler } from './app/middlewares/global.error.handler';
import { router } from './app/routes/index.routes';
import { notFound } from './app/middlewares/notFound';

const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1', router);

const test = (req: Request, res: Response) => {
  Promise.reject();
  res.send('Practice PH-U');
};

app.get('/', test);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
