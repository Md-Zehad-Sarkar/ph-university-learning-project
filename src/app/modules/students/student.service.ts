import { StudentModel } from '../studentsModel/students.model';
import { Student } from './students.interface';

//create a student
const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

//get a student
const getAllStudentsFromDB = () => {
  const result = StudentModel.find();
  return result;
};

//get a single student by id
const getSingleStudentFromDB = (id: string) => {
  const result = StudentModel.findOne({ id });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
