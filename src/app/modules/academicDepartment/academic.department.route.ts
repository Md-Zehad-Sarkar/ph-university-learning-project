import express from 'express';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
} from './academic.department.validation';
import { academicDepartmentController } from './academic.department.controller';
const router = express.Router();

//create academic department
router.post(
  '/create-academic-department',
  validateRequest(createAcademicDepartmentValidationSchema),
  academicDepartmentController.createAcademicDepartment,
);

//get academic department
router.get('/', academicDepartmentController.getAllAcademicDepartment);

//get single academic department
router.get(
  '/:departmentId',
  academicDepartmentController.getSingleAcademicDepartment,
);

//update academic department
router.patch(
  '/:departmentId',
  validateRequest(updateAcademicDepartmentValidationSchema),
  academicDepartmentController.updateAcademicDepartment,
);

export const academicDepartmentRoutes = router;
