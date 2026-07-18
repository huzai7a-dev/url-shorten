import { STATUS_CODES } from "../constants/index.js";

//this module could be simplified by using a single class with a status code property, but for clarity and explicitness, we define separate classes for different error types.
export class AppError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found", details?: unknown) {
    super(STATUS_CODES.NOT_FOUND, message, details);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class ConflictError extends AppError {
  constructor(message = "Resource already exists", details?: unknown) {
    super(STATUS_CODES.CONFLICT, message, details);
    Object.setPrototypeOf(this, ConflictError.prototype);
  }
}