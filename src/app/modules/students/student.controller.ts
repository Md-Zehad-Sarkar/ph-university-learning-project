/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { studentServices } from './student.services';
import zodStudentSchema from './student.zod.validation';



const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    //zod validation schema
    const zodParseData = zodStudentSchema.parse(studentData);
    const result = await studentServices.createStudentIntoDB(zodParseData);

    //send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

//get all students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'students are retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

//get a single student
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'single students are retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const deleted = await studentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'student has deleted successfully',
      data: deleted,
    });
   
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    });
  }
};

export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
