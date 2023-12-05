import { userServices } from './user.services';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { student: studentInfo, password } = req.body;

  const studentData = await userServices.createUserIntoDB(
    password,
    studentInfo,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student create successfully',
    data: studentData,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await userServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await userServices.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});


export const userController = { createStudent, createFaculty,createAdmin };
