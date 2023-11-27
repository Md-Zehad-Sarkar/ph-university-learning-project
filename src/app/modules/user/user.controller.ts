import { userServices } from './user.services';
import { sendResponse } from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;
  const studentData = await userServices.createStudentIntoDB(password, student);
  // res.status(200).json({
  //   success: true,
  //   message: 'user created successfully',
  //   data: studentData,
  // });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user created successfully',
    data: studentData,
  });
});

export const userController = {
  createStudent,
};
