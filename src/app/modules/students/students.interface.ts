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
  name: StudentName;
  email: string;
  gender: 'Male' | 'Female' | 'Others';
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  profileImage?: string;
  isActive: 'active' | 'blocked';
};

//student method
export type StudentMethod = {
  isUserExists(id: string): Promise<TStudent | null>;
};

export type StudentModel = Model<TStudent, Record<string, never>, StudentMethod>;
