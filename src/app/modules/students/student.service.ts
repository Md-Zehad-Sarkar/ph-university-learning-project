import { Aggregate } from 'mongoose';
import { Student } from '../studentsModel/students.model';
import { TStudent } from './students.interface';

//create a student
const createStudentIntoDB = async (studentData: TStudent) => {
  // for custom static
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('user already exist');
  }
  const result = await Student.create(studentData); //built in static method
  return result;

  //for custom instance
  // const student = new Student(studentData); //create an instance
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('user already exist');
  // }
  // const result = await student.save(); //built in instance method
  // return result;
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
  // const result = Student.findOne({ id });
  // for Aggregate
  const result = Student.aggregate([{ $match: { id: id } }]);
  return result;
};

//delete a student
const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
