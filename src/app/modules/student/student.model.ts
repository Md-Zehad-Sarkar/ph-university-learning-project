import { Schema, model } from 'mongoose';
import { StudentModel, TStudent } from './student.interface';

const TStudentNameSchema = new Schema({
  firstName: { type: String, required: [true, 'first name is requires'] },
  lastName: { type: String, required: [true, 'last name is requires'] },
});

const TGuardianSchema = new Schema({
  fatherName: { type: String, required: [true, 'fathers name is requires'] },
  motherName: { type: String, required: [true, 'mother name is requires'] },
  contactNo: { type: String, required: [true, 'contact No is requires'] },
});

const TLocalGuardianSchema = new Schema({
  localGuardianName: { type: String },
  contactNo: { type: String, required: [true, 'contact No is requires'] },
  address: {
    type: String,
    required: [true, 'localGuardian address is requires'],
  },
});

const TAddressSchema = new Schema({
  presentAddress: {
    type: String,
    required: [true, 'presentAddress is requires'],
  },
  permanentAddress: {
    type: String,
    required: [true, 'permanentAddress address is requires'],
  },
  city: String,
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, unique: true, required: true },
    user: { type: Schema.Types.ObjectId, unique: true, ref: 'User' },
    name: { type: TStudentNameSchema, required: [true, 'Name is required'] },
    email: { type: String, required: true, unique: true },
    contactNo: { type: String, required: true },
    emergencyContactNo: { type: String, required: true },
    dateOfBirth: { type: String },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Others'],
      required: true,
    },
    address: { type: TAddressSchema, required: true },
    guardian: { type: TGuardianSchema, required: true },
    localGuardian: { type: TLocalGuardianSchema, required: true },
    bloodGroup: { type: String },
    profileImg: { type: String },
    admissionSemester: { type: Schema.Types.ObjectId, ref: 'AcademicSemester' },
    isDeleted: { type: Boolean },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
  },
  { timestamps: true },
);

studentSchema.statics.isUserExists = async function (id: string) {
  const existingStudent = await this.findOne({ id });
  return existingStudent;
};
//student model
export const Student = model<TStudent, StudentModel>('Student', studentSchema);
