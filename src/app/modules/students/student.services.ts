import { TStudent } from "./students.interface";
import { Student } from "./students.model";


//create a student
const createStudentIntoDB = async (studentData: TStudent) => {
  // for custom static
  if (await Student.isUserExists(studentData.id)) {
    throw new Error('user already exist');
  }
  const result = await Student.create(studentData); //built in static method
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
