import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  StudentName,
} from '../students/students.interface';

//student name schema
const studentNameSchema = new Schema<StudentName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [20, "First name can't more then 15 character"],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not capitalized',
    },
  },
  middleName: { type: String, trim: true },
  lastName: { type: String, required: true, trim: true },
});
//guardian schema
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, trim: true },
  motherName: { type: String, trim: true },
  fatherOccupation: { type: String, trim: true },
  motherOccupation: { type: String, trim: true },
  fatherContactNo: { type: String, trim: true },
  motherContactNo: { type: String, trim: true },
});
//localGuardian schema
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, trim: true },
  contactNo: { type: String },
});

//students Schema
const studentSchema = new Schema<Student>({
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

export const StudentModel = model<Student>('Student', studentSchema);
