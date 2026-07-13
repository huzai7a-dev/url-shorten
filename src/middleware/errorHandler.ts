import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/error.js';
import { logger } from '../logger.js';
export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      code: err.statusCode,
      success: false,
      message: err.message,
      errors: err.details,
    });
    return;
  }

  logger.error({err}, 'unexpected errors');

  res.status(500).json({
    success: false,
    message: 'Internal server error',
  });
};