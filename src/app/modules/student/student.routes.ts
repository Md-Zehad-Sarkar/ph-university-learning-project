import express from 'express';
import { studentController } from './student.controller';
const router = express.Router();

router.get('/', studentController.getAllStudent); //get all student
router.get('/:id', studentController.getSingleStudent); //get single student
router.delete('/:id', studentController.deleteSingleStudent); //delete single student
router.delete('/', studentController.deleteAllStudent); //delete all student
export const studentRoute = router;
