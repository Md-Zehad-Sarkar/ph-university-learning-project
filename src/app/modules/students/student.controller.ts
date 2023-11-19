import { Request, Response } from 'express';
import { studentServices } from './student.service';
import joiStudentSchema from './student.joi.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    //implement joi schema
    // const { error, value } = joiStudentSchema.validate(studentData);
    const { error } = joiStudentSchema.validate(studentData); //if value not use no need to declared
    // console.log(error, value);
    //will call from service
    const result = await studentServices.createStudentIntoDB(studentData);
    if (error) {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        error: error.details,
      });
    }

    //send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
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
  } catch (error) {
    console.log(error);
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
  } catch (error) {
    console.log(error);
  }
};

export const studentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
