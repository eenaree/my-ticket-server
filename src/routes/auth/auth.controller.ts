import * as express from 'express';
import * as passport from 'passport';

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
    res.json({
      success: true,
      message: '사용자 인증이 성공적으로 처리됐습니다.',
      user: req.user,
    });
  }
};

export const logout: express.RequestHandler = (req, res, next) => {
  req.logout(error => {
    if (error) {
      return next(error);
    }
    // MEMO: redirect? json?
    // res.redirect(CLIENT_URL);
  });
};
