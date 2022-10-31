import * as express from 'express';
import { isLoggedIn } from '~/middlewares';
import { ticketController } from './tickets.controller';

const router = express.Router();

router.post('/', isLoggedIn, ticketController.createTicket);
router.get('/my', isLoggedIn, ticketController.getMyTickets);

export default router;
