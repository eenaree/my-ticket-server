import * as express from 'express';
import { AppError } from './AppError';

export const errorHandler: express.ErrorRequestHandler = (err, req, res) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .send({ name: err.name, status: err.statusCode, message: err.message });
  }

  res
    .status(500)
    .send({ name: 'UnknownError', status: 500, message: 'Unknown error' });
};
