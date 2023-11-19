import { Student } from '../studentsModel/students.model';
import { TStudent } from './students.interface';

//create a student
const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student);//built in static method
  // return result;
  const student = new Student(studentData); //create an instance
  if (await student.isUserExists(studentData.id)) {
    throw new Error('user already exist');
  }
  const result = await student.save(); //built in instance method
  return result;
};

//get a student
const getAllStudentsFromDB = () => {
  // const result = StudentModel.find();
  const result = Student.find();
  return result;
};

//get a single student by id
const getSingleStudentFromDB = (id: string) => {
  // const result = StudentModel.findOne({ id });
  const result = Student.findOne({ id });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
