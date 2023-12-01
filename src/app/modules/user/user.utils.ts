import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

//find last student
const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

//generate student id automatically
const generateStudentId = async (payload: TAcademicSemester) => {
  //initial/first student id always 0000
  let currentId = (0).toString();

  const lastStudentId = await findLastStudentId(); //call findLastStudentId to get last student id
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentYear = lastStudentId?.substring(0, 4);
  const currentStudentSemesterCode = payload.code;
  const currentStudentYear = payload.year;

  //checking student year and code. if matched separate semester and separate year and code will be count separately.
  if (
    lastStudentId &&
    lastStudentSemesterCode === currentStudentSemesterCode &&
    lastStudentYear === currentStudentYear
  ) {
    //increment with initial then last student
    currentId = lastStudentId?.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  return incrementId;
};
export default generateStudentId;