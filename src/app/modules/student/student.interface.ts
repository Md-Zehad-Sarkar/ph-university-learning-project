import { Model, Types } from 'mongoose';

export type TStudentName = {
  firstName: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  motherName: string;
  contactNo: string;
};

export type TLocalGuardian = {
  localGuardianName: string;
  contactNo: string;
  address: string;
};

export type TAddress = {
  presentAddress: string;
  permanentAddress: string;
  city: string;
};

//type a student
export type TStudent = {
  id: string;
  user: Types.ObjectId;
  name: TStudentName;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Others";
  address: TAddress;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  bloodGroup?: string;
  profileImg?: string;
  admissionSemester: Types.ObjectId;
};

//static method type
export interface StudentModel extends Model<TStudent> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TStudent | null>;
}
