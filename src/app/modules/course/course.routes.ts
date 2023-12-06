import express from 'express';
import { courseControllers } from './course.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import { createCourseValidationSchema } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(createCourseValidationSchema),
  courseControllers.createCourse,
);

router.get('/', courseControllers.getAllCourse);

router.get('/:id', courseControllers.getSingleCourse);

router.delete('/:id', courseControllers.deleteCourse);

export const courseRoutes = router;
