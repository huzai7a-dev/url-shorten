import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { AppError } from '../utils/error.js';
import { STATUS_CODES } from '../constants/index.js';

export const validationRequest = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(
          new AppError(
            STATUS_CODES.BAD_REQUEST,
            'Validation failed',
            error.errors.map((err) => ({
              path: err.path.join('.'),
              message: err.message,
            }))
          )
        );
      }
      next(error);
    }
  };
};