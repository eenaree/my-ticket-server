import * as express from 'express';
import * as passport from 'passport';
import { NotFoundError, UnknownError } from '~/lib/AppError';

const CLIENT_URL = 'http://localhost:4000';

export const authController = {
  passportAuth(strategy: string) {
    return passport.authenticate(strategy);
  },

  passportAuthCallback(strategy: string) {
    return passport.authenticate(strategy, {
      successRedirect: `${CLIENT_URL}/authenticated`,
    });
  },

  login(req: express.Request, res: express.Response) {
    if (req.user) {
      res.send(req.user);
    } else {
      throw new NotFoundError('User not found');
    }
  },

  logout(req: express.Request, res: express.Response) {
    req.logout(error => {
      if (error) {
        throw new UnknownError();
      }
      res.send('로그아웃 성공');
    });
  },
};
