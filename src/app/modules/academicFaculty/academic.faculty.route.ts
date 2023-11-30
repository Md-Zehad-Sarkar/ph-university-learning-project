import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
} from './academic.faculty.validation';
import { academicFacultyController } from './academic.faculty.controller';

const router = express.Router();

//create academic faculty
router.post(
  '/create-academic-faculty',
  validateRequest(createAcademicFacultyValidationSchema),
  academicFacultyController.createAcademicFaculty,
);

//get all academic faculty
router.get('/', academicFacultyController.getAllAcademicFaculty);

//get single academic faculty
router.get('/:facultyId', academicFacultyController.getSingleAcademicFaculty);

//update single academic faculty
router.patch(
  '/:facultyId',
  validateRequest(updateAcademicFacultyValidationSchema),
  academicFacultyController.updateAcademicFaculty,
);

export const academicFacultyRoutes = router;
