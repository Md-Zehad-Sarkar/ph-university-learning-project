import express from 'express';
import { userController } from './user.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { studentValidationSchema } from '../student/student.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidationSchema),
  userController.createStudent,
);

export const userRoute = router;
