import { z } from 'zod';

const createPreRequisiteCourseValidation = z.object({
  course: z.string(),
  isDeleted: z.boolean().default(false),
});

export const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credit: z.number(),
    preRequisiteCourses: z.array(createPreRequisiteCourseValidation).optional(),
  }),
});

//update course validation schema
export const updateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credit: z.number().optional(),
    preRequisiteCourses: z.array(createPreRequisiteCourseValidation).optional(),
  }),
});

export const assignFacultiesWithCourseValidationSchema = z.object({
  body: z.object({
    faculties: z.array(z.string()),
  }),
});
