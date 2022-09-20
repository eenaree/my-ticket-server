import { Router } from 'express';
import authRouter from './auth';
import teamsRouter from './teams';

const router = Router();

router.use('/auth', authRouter);
router.use('/teams', teamsRouter);

export default router;
