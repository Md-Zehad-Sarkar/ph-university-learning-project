import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import { studentRoutes } from './app/modules/students/students.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

//application route
app.use('/api/v1/student', studentRoutes);
app.use('/api/v1/student', studentRoutes);
app.use('/api/v1/student', studentRoutes);

const getStudent = (req: Request, res: Response) => {
  res.send('hello world');
};

app.get('/', getStudent);

// console.log(process.cwd());

export default app;
