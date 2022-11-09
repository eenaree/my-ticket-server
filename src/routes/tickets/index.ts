import * as express from 'express';
import { isLoggedIn } from '~/middlewares';
import { ticketController } from './ticket.controller';

const router = express.Router();

router.post('/', isLoggedIn, ticketController.create);
router.get('/my', isLoggedIn, ticketController.getAll);

export default router;
