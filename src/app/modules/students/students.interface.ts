import { Model } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  motherName: string;
  fatherOccupation: string;
  motherOccupation: string;
  fatherContactNo: string;
  motherContactNo: string;
};

export type TStudentName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  contactNo: string;
};

export type TStudent = {
  id: string;
  password: string;
  name: TStudentName;
  email: string;
  gender: 'Male' | 'Female' | 'Others';
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
  isDeleted: boolean;
};
//creating custom static
export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

