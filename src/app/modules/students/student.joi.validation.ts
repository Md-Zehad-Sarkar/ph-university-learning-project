import Joi from 'joi';

//schema validation using joi library  start
const studentNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .max(20)
    .pattern(/^[A-Za-z]+$/)
    .message('First name must be alphabetic'),
  middleName: Joi.string().trim(),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .message('Last name must be alphabetic'),
});

const guardianSchema = Joi.object({
  fatherName: Joi.string().trim(),
  motherName: Joi.string().trim(),
  fatherOccupation: Joi.string().trim(),
  motherOccupation: Joi.string().trim(),
  fatherContactNo: Joi.string().trim(),
  motherContactNo: Joi.string().trim(),
});

const localGuardianSchema = Joi.object({
  name: Joi.string().trim(),
  contactNo: Joi.string(),
});

const joiStudentSchema = Joi.object({
  id: Joi.string().required(),
  name: studentNameSchema
    .required()
    .messages({ 'any.required': 'Name must be required' }),
  email: Joi.string()
    .email()
    .trim()
    .required()
    .messages({ 'any.required': 'Email must be required' }),
  gender: Joi.string().valid('Male', 'Female', 'Others').required(),
  dateOfBirth: Joi.string().required(),
  contactNo: Joi.string(),
  emergencyContactNo: Joi.string()
    .required()
    .messages({ 'any.required': 'Emergency contact is required' }),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'O+',
    'O-',
    'AB+',
    'AB-',
  ),
  presentAddress: Joi.string().required(),
  permanentAddress: Joi.string(),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImage: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default joiStudentSchema;