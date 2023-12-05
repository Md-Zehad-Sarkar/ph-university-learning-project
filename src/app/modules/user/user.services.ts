/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils';
import { AppError } from '../../error/AppError';
import httpStatus from 'http-status';
import { Admin } from '../admin/admin.model';
import { Faculty } from '../faculty/faculty.model';
import { AcademicDepartment } from '../academicDepartment/academic.department.model';
import { TFaculty } from '../faculty/faculty.interface';

//create student user
const createUserIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  //set user password
  userData.password = password || config.default_password;
  //set user role
  userData.role = 'student';

  //find admission semester id
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  //create session for transaction
  const session = await mongoose.startSession();
  try {
    //start transaction
    session.startTransaction();
    //set student id automatically
    userData.id = await generateStudentId(admissionSemester!);
    // create a user
    // const newUser = await User.create(userData);//before transaction use for create user
    //transaction 1
    const newUser = await User.create([userData], { session }); //create user with transaction

    //create a new student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'user not created');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;
    //transaction 2
    const newStudent = await Student.create([payload], { session });
    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'student not created');
    }

    //commit session transaction
    await session.commitTransaction();
    await session.endSession(); //session end

    return newStudent;
  } catch (error) {
    //if transaction failed then execute abortTransaction and end
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'student could not create');
  }

  //before transaction for create a user

  // //set student id automatically
  // userData.id = await generateStudentId(admissionSemester!);
  // // create a user
  // const newUser = await User.create(userData);

  // //create a new student
  // if (Object.keys(newUser).length) {
  //   payload.id = newUser.id;
  //   payload.user = newUser._id;
  //   const newStudent = await Student.create(payload);
  //   return newStudent;
  // }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'faculty';

  // find academic department info
  const academicDepartment = await AcademicDepartment.findById(
    payload.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(400, 'Academic department not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateFacultyId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }); // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session });

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

const createAdminIntoDB = async (password: string, payload: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'admin';

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await generateAdminId();

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }
    // set id , _id as user
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session });

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};


export const userServices = {
  createUserIntoDB,
  createAdminIntoDB,
  createFacultyIntoDB,
};
