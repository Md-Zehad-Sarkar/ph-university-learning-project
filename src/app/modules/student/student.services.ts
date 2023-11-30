import httpStatus from 'http-status';
import { AppError } from '../../error/AppError';
import { TStudent } from './student.interface';
import { Student } from './student.model';

//get all student
const getAllStudentFromDB = async () => {
  const result = await Student.find()
    .select({ password: 0, _id: 0 })
    .populate('admissionSemester')
    .populate({
      //nested populate korte hole path a parent r populate a child property dite hobe.
      path: 'academicDepartment', //parent child
      populate: 'academicFaculty', //child
    });
  return result;
};

//get single student
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id: id })
    .select({ password: 0 })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: { path: 'academicFaculty' },
    });
  //if id not found send this error message
  if (!result) {
    throw new AppError(404, `Single student not found with this id ${id}`);
  }
  return result;
};

//update single student
const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const result = await Student.findOneAndUpdate({ id: id }, payload, {
    new: true,
  }).select({ password: 0 });

  //if id not found send this error message
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Single student can not update with this id ${id}`,
    );
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
  updateStudentFromDB,
  deleteStudentFromDB,
  deleteAllStudentFromDB,
};
