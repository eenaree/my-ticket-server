import * as express from 'express';

export const isLoggedIn: express.RequestHandler = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ success: false, message: '로그인이 필요합니다.' });
  }
};
