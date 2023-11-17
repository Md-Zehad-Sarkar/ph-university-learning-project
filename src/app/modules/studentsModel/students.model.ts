import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  StudentName,
} from '../students/students.interface';

//student name schema
const studentNameSchema = new Schema<StudentName>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});
//guardian schema
const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String },
  motherName: { type: String },
  fatherOccupation: { type: String },
  motherOccupation: { type: String },
  fatherContactNo: { type: String },
  motherContactNo: { type: String },
});
//localGuardian schema
const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String },
  contactNo: { type: String },
});

//students Schema
const studentSchema = new Schema<Student>({
  id: { type: String },
  name: studentNameSchema,
  email: { type: String, required: true },
  gender: ['Male', 'Female'],
  dateOfBirth: { type: String },
  contactNo: { type: String },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  presentAddress: { type: String },
  permanentAddress: { type: String },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImage: { type: String },
  isActive: ['active', 'blocked'],
});

export const StudentModel = model<Student>('Student', studentSchema);
