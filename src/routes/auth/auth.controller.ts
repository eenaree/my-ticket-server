import * as express from 'express';
import * as passport from 'passport';
import { NotFoundError, UnknownError } from '~/lib/AppError';

const CLIENT_URL = 'http://localhost:4000';

export const kakaoAuth = passport.authenticate('kakao');
export const kakaoAuthCallback = passport.authenticate('kakao', {
  successRedirect: `${CLIENT_URL}/authenticated`,
});

export const googleAuth = passport.authenticate('google');
export const googleAuthCallback = passport.authenticate('google', {
  successRedirect: `${CLIENT_URL}/authenticated`,
});

export const naverAuth = passport.authenticate('naver');
export const naverAuthCallback = passport.authenticate('naver', {
  successRedirect: `${CLIENT_URL}/authenticated`,
});

export const login: express.RequestHandler = (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    throw new NotFoundError('User not found');
  }
};

export const logout: express.RequestHandler = (req, res) => {
  req.logout(error => {
    if (error) {
      throw new UnknownError();
    }
    res.send('로그아웃 성공');
  });
};
