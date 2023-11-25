import z from 'zod';

const StudentName = z.object({
  firstName: z.string().trim().max(20),
  middleName: z.string().trim(),
  lastName: z.string().trim(),
});

const Guardian = z.object({
  fatherName: z.string().trim(),
  motherName: z.string().trim(),
  fatherOccupation: z.string().trim(),
  motherOccupation: z.string().trim(),
  fatherContactNo: z.string().trim(),
  motherContactNo: z.string().trim(),
});

const LocalGuardian = z.object({
  name: z.string().trim(),
  contactNo: z.string(),
});

const zodStudentSchema = z.object({
  id: z.string(),
  password: z.string(),
  name: StudentName.required().refine(
    (data) => data.firstName || data.middleName || data.lastName,
    {
      message: 'Name must be required',
    },
  ),
  email: z.string().email().trim(),
  gender: z.enum(['Male', 'Female', 'Others']),
  dateOfBirth: z.string(),
  contactNo: z.string(),
  emergencyContactNo: z.string().refine((data) => data.length > 0, {
    message: 'Emergency contact is required',
  }),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: Guardian,
  localGuardian: LocalGuardian,
  profileImage: z.string(),
  isActive: z.enum(['active', 'blocked']).default('active'),
  isDeleted: z.boolean().default(false),
});

export default zodStudentSchema;
