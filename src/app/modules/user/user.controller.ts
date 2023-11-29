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
export const userController = { createStudent };
