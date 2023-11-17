import express from 'express';
import { studentController } from './student.controller';

const router = express.Router();
//get all students
router.get('/all-students', studentController.getAllStudents);

//get single student
router.get('/:studentId', studentController.getSingleStudent);

//create student
router.post('/create-student', studentController.createStudent);
export const studentRoutes = router;
