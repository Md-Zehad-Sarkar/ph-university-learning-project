import express from 'express';
import { courseControllers } from './course.controller';
import { validateRequest } from '../../middlewares/validateRequest';
import {
  facultiesWithCourseValidationSchema,
  createCourseValidationSchema,
  updateCourseValidationSchema,
} from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(createCourseValidationSchema),
  courseControllers.createCourse,
);

router.get('/', courseControllers.getAllCourse);

router.get('/:id', courseControllers.getSingleCourse);

router.patch(
  '/update/:id',
  validateRequest(updateCourseValidationSchema),
  courseControllers.updateCourse,
);

//put route for course faculties
router.put(
  '/:courseId/assign-faculties',
  validateRequest(facultiesWithCourseValidationSchema),
  courseControllers.assignFacultiesWithCourse,
);

//remove faculty
router.delete(
  '/:courseId/remove-faculties',
  validateRequest(facultiesWithCourseValidationSchema),
  courseControllers.removeFacultiesWithCourse,
);

//delete-update operation route
router.patch('/:id', courseControllers.deleteCourse);

export const courseRoutes = router;
