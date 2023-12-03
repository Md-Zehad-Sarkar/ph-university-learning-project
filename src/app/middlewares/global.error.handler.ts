/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSource } from '../interfaces/error';
import config from '../config';
import { handleZodErrors } from '../error/handleZodError';
import { handleMongooseError } from '../error/handleMongooseError';
import { handleCastError } from '../error/handleCastError';
import { handleDuplicateError } from '../error/handleDuplicateError';

export const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something Went Wrong!!';
  let errorSources: TErrorSource = [
    {
      path: '',
      message: 'Validation error',
    },
  ];

  if (error instanceof ZodError) {
    //for zod err handle steps
    const simplifiedError = handleZodErrors(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.name === 'ValidationError') {
    //mongoose err handle step
    const simplifiedError = handleMongooseError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  res.status(statusCode).json({
    success: false,
    message: message,
    errorSources,
    error, //global
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
  });
  next();
};
