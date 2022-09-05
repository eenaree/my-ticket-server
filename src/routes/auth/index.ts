import * as express from 'express';
import * as passport from 'passport';

const router = express.Router();
const CLIENT_URL = 'http://localhost:4000';

router.get('/kakao', passport.authenticate('kakao'));
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    successRedirect: CLIENT_URL,
  })
);

export default router;
