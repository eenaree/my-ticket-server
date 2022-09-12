import * as express from 'express';
import * as controller from './auth.controller';

const router = express.Router();

router.get('/kakao', controller.kakaoAuth);
router.get('/kakao/callback', controller.kakaoAuthCallback);

router.get('/google', controller.googleAuth);
router.get('/google/callback', controller.googleAuthCallback);

router.get('/naver', controller.naverAuth);
router.get('/naver/callback', controller.naverAuthCallback);

router.get('/login', controller.login);
router.post('/logout', controller.logout);

export default router;
