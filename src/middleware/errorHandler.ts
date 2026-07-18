import { Request, Response, NextFunction } from 'express';
import { AppError, ConflictError, NotFoundError } from '../utils/error.js';

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof NotFoundError) {
    req.log.info({ err }, 'not found error');

    res.status(err.statusCode).json({
      code: err.statusCode,
      success: false,
      message: err.message,
      errors: err.details,
    });

    return;
  }
  else if (err instanceof ConflictError) {
    req.log.info({ err }, 'conflict error');

    res.status(err.statusCode).json({
      code: err.statusCode,
      success: false,
      message: err.message,
      errors: err.details,
    });
    return;
  }

  else if (err instanceof AppError) {
    req.log.info({ err }, 'app error');

    res.status(err.statusCode).json({
      code: err.statusCode,
      success: false,
      message: err.message,
      errors: err.details,
    });
    return;
  } else {
    req.log.error({ err }, 'unexpected errors');

    res.status((err as any)?.statusCode ?? 500).json({
      success: false,
      message: err instanceof AppError ? err.message : "Internal server error"
    });
  }
};