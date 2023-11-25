import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import { userRoutes } from './app/modules/user/user.route';
import { globalErrorHandler } from './app/middleware/globalErrorHandler';
const app: Application = express();

app.use(express.json());
app.use(cors());

//application route
app.use('/api/v1/users', userRoutes);
const getStudent = (req: Request, res: Response) => {
  res.send('PH - UNIVERSITY');
};

app.get('/', getStudent);
//error handler middleware
app.use(globalErrorHandler);

export default app;
