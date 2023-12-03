import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import generateStudentId from './user.utils';
import { AppError } from '../../error/AppError';
import httpStatus from 'http-status';

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

export const userServices = { createUserIntoDB };
