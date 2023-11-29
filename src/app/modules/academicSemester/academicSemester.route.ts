import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
const router = express.Router();

//create academic semester route
router.post('/create-academic-semester',academicSemesterController.createAcademicSemester);

export const academicSemesterRoutes = router;
