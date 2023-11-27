import { NextFunction, Request, RequestHandler, Response } from 'express';

//higher order function (for remove a function that try catch block)[its clean code in a function , if we use higher order fn we need not use try catch block for error handling]

export const catchAsync = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => next(err));
  };
};
