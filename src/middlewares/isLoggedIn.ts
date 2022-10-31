import * as express from 'express';
import { UnauthorizedError } from '~/lib/AppError';

export const isLoggedIn: express.RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    throw new UnauthorizedError();
  }
};
