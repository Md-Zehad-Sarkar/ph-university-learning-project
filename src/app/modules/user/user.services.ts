import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import generateStudentId from './user.utils';

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

  //set student id manually
  userData.id = await generateStudentId(admissionSemester!);
  // create a user
  const newUser = await User.create(userData);

  //create a new student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const userServices = { createUserIntoDB };
