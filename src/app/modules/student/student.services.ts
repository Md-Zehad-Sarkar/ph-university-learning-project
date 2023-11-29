import { Student } from './student.model';

//get all student
const getAllStudentFromDB = async () => {
  const result = await Student.find().select({ password: 0, _id: 0 });
  return result;
};

//get single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id: id }).select({ password: 0 });
  //if id not found send this error message
  if (!result) {
    throw new Error(`Single student not found with this id ${id}`);
  }
  return result;
};

// delete student
const deleteStudentFromDB = async (id: string) => {
  const student = await Student.deleteOne({ id: id });
  return student;
};
// delete all student
const deleteAllStudentFromDB = async () => {
  const student = await Student.deleteMany();
  return student;
};

export const studentServices = {
  getAllStudentFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  deleteAllStudentFromDB,
};
