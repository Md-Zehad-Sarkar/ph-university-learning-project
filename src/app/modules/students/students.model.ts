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
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: true,
    trim: true,
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
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: [true, 'Id is required'], unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User Id is required'],
      unique: true,
      ref: 'User',
    },

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
    isDeleted: { type: Boolean, default: false },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual middleware
studentSchema.virtual('fullName').get(function () {
  return (
    this.name.firstName + ' ' + this.name.middleName + ' ' + this.name.lastName
  );
});

//query middleware
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
