import express from 'express';
import { studentRoute } from '../modules/student/student.routes';
import { userRoute } from '../modules/user/user.routes';
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
];

moduleRouter.forEach((route) => router.use(route.path, route.route));
