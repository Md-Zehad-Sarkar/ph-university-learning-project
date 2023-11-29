import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';

const createAcademicSemester = catchAsync(async (req, res) => {
  // const body = req.body;
  // semester = await;
  // sendResponse(res, {
  //   statusCode: httpStatus.OK,
  //   success: true,
  //   message: 'student retrieved successfully',
  //   data: semester,
  // });
});

export const academicSemesterController = { createAcademicSemester };
