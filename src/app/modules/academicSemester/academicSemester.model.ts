import { Schema, model } from 'mongoose';
import {
  TAcademicSemester,
 
} from './academicSemester.interface';
import { AcademicSemesterCodeSchema, AcademicSemesterMonthsSchema, AcademicSemesterNameSchema } from './academicSemester.constant';



const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: { type: String, enum: AcademicSemesterNameSchema, required: true },
  code: { type: String, enum: AcademicSemesterCodeSchema, required: true },
  year: { type: String, required: true },
  startMonth: {
    type: String,
    enum: AcademicSemesterMonthsSchema,
    required: true,
  },
  endMonth: {
    type: String,
    enum: AcademicSemesterMonthsSchema,
    required: true,
  },
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
