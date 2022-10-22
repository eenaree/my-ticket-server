import * as express from 'express';
import { isLoggedIn } from '~/middlewares';
import * as controller from './tickets.controller';

const router = express.Router();

router.post('/', isLoggedIn, controller.createTicket);
router.get('/my', isLoggedIn, controller.getMyTickets);

export default router;
