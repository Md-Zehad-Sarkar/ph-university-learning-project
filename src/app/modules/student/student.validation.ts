import { z } from 'zod';

const createStudentNameValidationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const createGuardianValidationSchema = z.object({
  fatherName: z.string(),
  motherName: z.string(),
  contactNo: z.string(),
});

const createLocalGuardianValidationSchema = z.object({
  localGuardianName: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

const createAddressValidationSchema = z.object({
  presentAddress: z.string(),
  permanentAddress: z.string(),
  city: z.string(),
});

// student validation schema
export const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: createStudentNameValidationSchema.required(),
      email: z.string(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      dateOfBirth: z.string(),
      gender: z.enum(['Male', 'Female', 'Others']),
      address: createAddressValidationSchema,
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      bloodGroup: z.string().optional(),
      profileImg: z.string().optional(),
      admissionSemester: z.string().optional(),
      isDeleted: z.boolean(),
      academicDepartment: z.string(),
    }),
  }),
});

//update student validation schema
const updateStudentNameValidationSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  contactNo: z.string().optional(),
});

const updateLocalGuardianValidationSchema = z.object({
  localGuardianName: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

const updateAddressValidationSchema = z.object({
  presentAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  city: z.string().optional(),
});

export const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: updateStudentNameValidationSchema.optional(),
      email: z.string().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      dateOfBirth: z.string().optional(),
      gender: z.enum(['Male', 'Female', 'Others']).optional(),
      address: updateAddressValidationSchema.optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      bloodGroup: z.string().optional(),
      profileImg: z.string().optional(),
      admissionSemester: z.string().optional().optional(),
      isDeleted: z.boolean().optional(),
      academicDepartment: z.string().optional(),
    }),
  }),
});