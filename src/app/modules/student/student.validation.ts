import { z } from 'zod';

const studentNameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const guardianValidationSchema = z.object({
  fatherName: z.string(),
  motherName: z.string(),
  contactNo: z.string(),
});

const localGuardianValidationSchema = z.object({
  localGuardianName: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const addressValidationSchema = z.object({
  presentAddress: z.string(),
  permanentAddress: z.string(),
  city: z.string(),
});

// student validation schema
export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: studentNameValidationSchema.required(),
      email: z.string(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      dateOfBirth: z.string(),
      gender: z.enum(['Male', 'Female', 'Others']),
      address: addressValidationSchema,
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      bloodGroup: z.string().optional(),
      profileImg: z.string().optional(),
      admissionSemester: z.string().optional(),
    }),
  }),
});

//update validation schema
export const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: studentNameValidationSchema.required().optional(),
      email: z.string().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      dateOfBirth: z.string().optional(),
      gender: z.enum(['Male', 'Female', 'Others']).optional(),
      address: addressValidationSchema.optional(),
      guardian: guardianValidationSchema.optional(),
      localGuardian: localGuardianValidationSchema.optional(),
      bloodGroup: z.string().optional(),
      profileImg: z.string().optional(),
      admissionSemester: z.string().optional(),
    }),
  }),
});
