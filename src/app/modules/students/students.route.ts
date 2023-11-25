import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();
//get all students
router.get('/all-students', studentController.getAllStudents);

//get single student
router.get('/:studentId', studentController.getSingleStudent);

//delete student
router.delete('/:studentId', studentController.deleteStudent);
export const studentRoutes = router;
