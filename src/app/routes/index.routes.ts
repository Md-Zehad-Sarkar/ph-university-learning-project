import express from 'express';
import { studentRoute } from '../modules/student/student.routes';
import { userRoute } from '../modules/user/user.routes';
import { academicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { academicFacultyRoutes } from '../modules/academicFaculty/academic.faculty.route';
import { academicDepartmentRoutes } from '../modules/academicDepartment/academic.department.route';
import { FacultyRoutes } from '../modules/faculty/faculty.routes';
import { AdminRoutes } from '../modules/admin/admin.routes';
import { courseRoutes } from '../modules/course/course.routes';
export const router = express.Router();
const moduleRouter = [
  //for students
  {
    path: '/students',
    route: studentRoute,
  },

  //for users
  {
    path: '/users',
    route: userRoute,
  },

  //for academic semester
  {
    path: '/academic-semester',
    route: academicSemesterRoutes,
  },

  //for academic faculty
  {
    path: '/academic-faculties',
    route: academicFacultyRoutes,
  },

  //for academic department
  {
    path: '/academic-department',
    route: academicDepartmentRoutes,
  },

  //for faculty
  {
    path: '/faculties',
    route: FacultyRoutes,
  },

  //for admin
  {
    path: '/admin',
    route: AdminRoutes,
  },

  //for course
  {
    path: '/course',
    route: courseRoutes,
  },
];

moduleRouter.forEach((route) => router.use(route.path, route.route));
