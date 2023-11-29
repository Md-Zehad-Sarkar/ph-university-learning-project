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

export const academicSemesterRoutes = router;
