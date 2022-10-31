import * as express from 'express';
import { isLoggedIn } from '~/middlewares';
import { teamController } from './team.controller';

const router = express.Router();

router.get('/', isLoggedIn, teamController.getMyTeams);
router.post('/', isLoggedIn, teamController.updateMyTeams);

export default router;
