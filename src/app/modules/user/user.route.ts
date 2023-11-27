import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
const router = express.Router();

//middleware for secure data validation
const senaBahini = (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  next();
};

router.post('/create-student', senaBahini, userController.createStudent);

export const userRoutes = router;
