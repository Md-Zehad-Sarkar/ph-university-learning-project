import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCodeSchema,
  AcademicSemesterMonthsSchema,
  AcademicSemesterNameSchema,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
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
  },
  { timestamps: true },
);

//checking semester name and year before save on database .if name and year are same then throw error
academicSemesterSchema.pre('save', async function (next) {
  const existing = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (existing) {
    throw new Error('semester and code already exist');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
