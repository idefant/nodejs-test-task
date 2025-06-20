import { Request, Response, NextFunction } from 'express';

import HttpException from '#models/HttpException';

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);
  if (err instanceof HttpException) {
    res.status(err.errorCode).json({ message: err.message, debug_message: err.debugMessage });
  } else {
    res.status(500).json({ debug_message: err.message });
  }
};
