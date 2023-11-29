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

export const studentValidationSchema = z.object({
  body: z.object({
    id: z.string(),
    name: studentNameValidationSchema.required(),
    email: z.string(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    dateOfBirth: z.string(),
    address: addressValidationSchema,
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    bloodGroup: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});
