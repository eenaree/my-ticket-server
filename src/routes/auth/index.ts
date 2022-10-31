import * as express from 'express';
import { authController } from './auth.controller';

const router = express.Router();

router.get('/kakao', authController.passportAuth('kakao'));
router.get('/kakao/callback', authController.passportAuthCallback('kakao'));

router.get('/google', authController.passportAuth('google'));
router.get('/google/callback', authController.passportAuthCallback('google'));

router.get('/naver', authController.passportAuth('naver'));
router.get('/naver/callback', authController.passportAuthCallback('naver'));

router.get('/login', authController.login);
router.post('/logout', authController.logout);

export default router;
