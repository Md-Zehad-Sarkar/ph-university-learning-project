import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (password: string, studentData: TStudent) => {
  const userData: Partial<TUser> = {};

  //set user password
  userData.password = password || config.default_password;
  //set user role
  userData.role = 'student';

  //set student id manually
  userData.id = '20232611';
  // create a user
  const newUser = await User.create(userData);

  //create a new student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id;
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const userServices = { createUserIntoDB };
