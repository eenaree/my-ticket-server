export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

export class UnknownError extends AppError {
  constructor(message = 'Unknown error', statusCode = 500) {
    super(message, statusCode);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', statusCode = 401) {
    super(message, statusCode);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden', statusCode = 403) {
    super(message, statusCode);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', statusCode = 404) {
    super(message, statusCode);
  }
}

export class BadRequestError extends AppError {
  constructor(message = 'Bad Request', statusCode = 400) {
    super(message, statusCode);
  }
}
