import express from 'express';
import { studentController } from './student.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';
const router = express.Router();

router.get('/', studentController.getAllStudent); //get all student

router.get('/:id', studentController.getSingleStudent); //get single student

router.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  studentController.updateStudent,
); //update single student

router.delete('/:id', studentController.deleteSingleStudent); //delete single student

router.delete('/', studentController.deleteAllStudent); //delete all student

export const studentRoute = router;
