import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { academicDepartmentServices } from './academic.department.services';
import { sendResponse } from '../../utils/sendResponse';

//create academic department
const createAcademicDepartment = catchAsync(async (req, res) => {
  const body = req.body;
  const result =
    await academicDepartmentServices.createAcademicDepartmentIntoDB(body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department created successfully',
    data: result,
  });
});

//get all academic department
const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentServices.getAllAcademicDepartmentFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department retrieved successfully',
    data: result,
  });
});

//get  academic department
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await academicDepartmentServices.getSingleAcademicDepartmentFromDB(
      departmentId,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department retrieved successfully',
    data: result,
  });
});

//update  academic department
const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const updateDoc = req.body;
  const result =
    await academicDepartmentServices.updateAcademicDepartmentIntoDB(
      departmentId,
      updateDoc,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department retrieved successfully',
    data: result,
  });
});

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
