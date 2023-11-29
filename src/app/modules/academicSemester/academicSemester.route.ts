import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { createAcademicSemesterValidationSchema } from './academicSemester.validation';
const router = express.Router();

//create academic semester route
router.post(
  '/create-academic-semester',
  validateRequest(createAcademicSemesterValidationSchema),
  academicSemesterController.createAcademicSemester,
);

//get all academic semester route
router.get('/', academicSemesterController.getAllAcademicSemester);

// get single academic semester
router.get(
  '/:semesterId',
  academicSemesterController.getSingleAcademicSemester,
);

// update a academic semester
router.patch('/:semesterId', academicSemesterController.updateAcademicSemester);

export const academicSemesterRoutes = router;
