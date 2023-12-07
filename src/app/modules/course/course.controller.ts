import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { courseServices } from './course.services';

const createCourse = catchAsync(async (req, res) => {
  const course = req.body;
  const result = await courseServices.createCourseIntoDB(course);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await courseServices.getAllCoursesFromDB(query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Course retrieved successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.getSingleCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Course retrieved successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateDoc = req.body;
  const result = await courseServices.updateCourseIntoDB(id, updateDoc);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Course updated successfully',
    data: result,
  });
});

//assign faculties
const assignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await courseServices.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'assign faculties successfully',
    data: result,
  });
});

//remove faculties
const removeFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await courseServices.removeFacultiesWithCourseFromDB(
    courseId,
    faculties,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'remove faculties successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseServices.deleteSingleCourseFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Course deleted successfully',
    data: result,
  });
});

export const courseControllers = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  removeFacultiesWithCourse,
};
