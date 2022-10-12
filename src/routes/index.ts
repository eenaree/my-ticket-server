import { Router } from 'express';
import authRouter from './auth';
import teamsRouter from './teams';
import ticketsRouter from './tickets';

const router = Router();

router.use('/auth', authRouter);
router.use('/teams', teamsRouter);
router.use('/tickets', ticketsRouter);

export default router;
