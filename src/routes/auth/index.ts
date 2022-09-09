import * as express from 'express';
import * as passport from 'passport';

const router = express.Router();
const CLIENT_URL = 'http://localhost:4000';

router.get('/kakao', passport.authenticate('kakao'));
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    successRedirect: `${CLIENT_URL}/authenticated`,
  })
);

router.get('/google', passport.authenticate('google'));
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: `${CLIENT_URL}/authenticated`,
  })
);

router.get('/naver', passport.authenticate('naver'));
router.get(
  '/naver/callback',
  passport.authenticate('naver', {
    successRedirect: `${CLIENT_URL}/authenticated`,
  })
);

router.get('/login', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: '로그인 성공',
      user: req.user,
    });
  } else {
    res.status(401).json({ success: false, message: '로그인 실패' });
  }
});

router.post('/logout', (req, res, next) => {
  req.logout(error => {
    if (error) {
      return next(error);
    }
    res.json({ success: true, message: '로그아웃 성공' });
  });
});

export default router;
