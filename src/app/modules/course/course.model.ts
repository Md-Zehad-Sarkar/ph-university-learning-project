import { Schema, model } from 'mongoose';
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourses,
} from './course.interface';

const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  isDeleted: { type: Boolean, default: false },
});

const courseSchema = new Schema<TCourse>({
  title: { type: String, trim: true, unique: true, required: true },
  prefix: { type: String, trim: true, required: true },
  code: { type: Number, trim: true, required: true },
  credit: { type: Number, trim: true, required: true },
  isDeleted: { type: Boolean, default: false },
  preRequisiteCourses: [preRequisiteCoursesSchema],
});

export const Course = model<TCourse>('Course', courseSchema);

//course faculties
const courseFacultySchema = new Schema<TCourseFaculty>({
  course: { type: Schema.Types.ObjectId, ref: 'Course', unique: true },
  faculties: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
      unique: true,
    },
  ],
});

export const CourseFaculty = model<TCourseFaculty>(
  'CourseFaculty',
  courseFacultySchema,
);
