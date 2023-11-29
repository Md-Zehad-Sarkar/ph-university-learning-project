/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = 500;
  const message = error.message || 'Something Went Wrong!!';
  res.status(statusCode).json({
    success: false,
    message: message,
    err: error,
  });
  next();
};
