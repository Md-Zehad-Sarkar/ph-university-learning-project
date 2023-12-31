import { studentServices } from './student.services';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';

//get all student
const getAllStudent = catchAsync(async (req, res) => {
  const query = req.query;
  const students = await studentServices.getAllStudentFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student retrieved successfully',
    data: students,
  });
});

//get single student
const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const student = await studentServices.getSingleStudentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single student retrieved successfully',
    data: student,
  });
});

//update single student
const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;

  const result = await studentServices.updateStudentFromDB(id, student);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'single student updated successfully',
    data: result,
  });
});

//delete single student (update)
const deleteSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await studentServices.deleteStudentFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student delete successfully',
    data: result,
  });
});

//delete all student
const deleteAllStudent = catchAsync(async (req, res) => {
  const result = await studentServices.deleteAllStudentFromDB();
  res.status(200).json({
    success: true,
    message: 'all student deleted successfully',
    data: result,
  });
});

export const studentController = {
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteSingleStudent,
  deleteAllStudent,
};
