import * as express from 'express';
import { isLoggedIn } from '@middlewares';
import * as controller from './team.controller';

const router = express.Router();

router.get('/', isLoggedIn, controller.getMyTeams);
router.post('/update', isLoggedIn, controller.updateMyTeams);

export default router;
