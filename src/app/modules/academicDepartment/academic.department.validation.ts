import { z } from 'zod';

export const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'name does not matched',
      required_error: 'name is required',
    }),
    academicFaculty: z.string({
      required_error: 'academic faculty is required',
    }),
  }),
});

export const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'name does not matched',
        required_error: 'name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: 'academic faculty is required',
      })
      .optional(),
  }),
});
