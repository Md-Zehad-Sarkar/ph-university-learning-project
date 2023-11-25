import { NextFunction, Request, Response } from 'express';
import { userServices } from './user.services';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student } = req.body;
    const studentData = await userServices.createStudentIntoDB(
      password,
      student,
    );
    res.status(200).json({
      success: true,
      message: 'user created successfully',
      data: studentData,
    });
  } catch (err) {
    next(err);
  }
};

export const userController = {
  createStudent,
};
