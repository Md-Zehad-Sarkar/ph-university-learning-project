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
