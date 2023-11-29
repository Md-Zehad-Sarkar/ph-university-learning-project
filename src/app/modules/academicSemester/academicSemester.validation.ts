import { z } from 'zod';
import {
  AcademicSemesterCodeSchema,
  AcademicSemesterMonthsSchema,
  AcademicSemesterNameSchema,
} from './academicSemester.constant';

export const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z.enum([...AcademicSemesterNameSchema] as [string, ...string[]]),
    code: z.enum([...AcademicSemesterCodeSchema] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...AcademicSemesterMonthsSchema] as [
      string,
      ...string[],
    ]),
    endMonth: z.enum([...AcademicSemesterMonthsSchema] as [
      string,
      ...string[],
    ]),
  }),
});
export const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z
      .enum([...AcademicSemesterNameSchema] as [string, ...string[]])
      .optional(),
    code: z
      .enum([...AcademicSemesterCodeSchema] as [string, ...string[]])
      .optional(),
    year: z.string().optional(),
    startMonth: z
      .enum([...AcademicSemesterMonthsSchema] as [string, ...string[]])
      .optional(),
    endMonth: z
      .enum([...AcademicSemesterMonthsSchema] as [string, ...string[]])
      .optional(),
  }),
});
