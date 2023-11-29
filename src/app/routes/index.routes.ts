import express from 'express';
import { studentRoute } from '../modules/student/student.routes';
import { userRoute } from '../modules/user/user.routes';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
export const router = express.Router();
const moduleRouter = [
  {
    path: '/students',
    route: studentRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/academic-semester',
    route: academicSemesterRoutes,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));
