import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentName,
} from '../students/students.interface';

//student name schema
const studentNameSchema = new Schema<TStudentName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, "First name can't more then 15 character"],
    //build in validation /custom
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not capitalized',
    // },
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: true,
    trim: true,
    //npm validator
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
  },
});
//guardian schema
const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, trim: true },
  motherName: { type: String, trim: true },
  fatherOccupation: { type: String, trim: true },
  motherOccupation: { type: String, trim: true },
  fatherContactNo: { type: String, trim: true },
  motherContactNo: { type: String, trim: true },
});
//localGuardian schema
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, trim: true },
  contactNo: { type: String },
});

//students Schema
const studentSchema = new Schema<TStudent>({
  id: { type: String, required: true, unique: true },
  name: {
    type: studentNameSchema,
    required: [true, 'name must be required'],
  },
  email: {
    type: String,
    required: [true, 'email must be required'],
    unique: true,
    trim: true,
    validate: { validator: (value: string) => validator.isEmail(value) },
  },
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female', 'Others'],
      message:
        " {VALUE} is not valid. Please gender must be fill up following one  'Male', 'Female', 'Others'",
    },
    required: true,
  },
  dateOfBirth: { type: String, required: true },
  contactNo: { type: String },
  emergencyContactNo: {
    type: String,
    required: [true, 'emergency const is required'],
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
      message:
        "blood group following 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'",
    },
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImage: { type: String },
  isActive: { type: String, enum: ['active', 'blocked'], default: 'active' },
});

studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = Student.findOne({ id: id });
  return existingUser;
};

export const Student = model<TStudent,StudentModel>('Student', studentSchema);
// export const StudentModel = model<TStudent>('Student', studentSchema);
