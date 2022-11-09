import * as express from 'express';
import { isLoggedIn } from '~/middlewares';
import { teamController } from './team.controller';

const router = express.Router();

router.get('/', isLoggedIn, teamController.getAll);
router.post('/', isLoggedIn, teamController.update);

export default router;
