import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academic.faculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>({
  name: { type: String, unique: true, required: true },
});
export const AcademicFaculty = model<TAcademicFaculty>(
  'AcademicFaculty',
  academicFacultySchema,
);
