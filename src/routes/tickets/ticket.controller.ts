import { Ticket } from '@prisma/client';
import * as express from 'express';
import { TicketBody, ticketService } from '~/services/ticket';
import { TypedExpressBody, TypedExpressQuery } from '~/typings/db';

export const ticketController = {
  async create(
    req: TypedExpressBody<TicketBody>,
    res: express.Response<Ticket>
  ) {
    if (req.user) {
      const newTicket = await ticketService.create(req.body, req.user.id);
      res.send(newTicket);
    }
  },

  async getAll(
    req: TypedExpressQuery<{ lastId?: string }>,
    res: express.Response
  ) {
    if (req.user) {
      const myTickets = await ticketService.getAll(
        req.user.id,
        req.query.lastId ? +req.query.lastId : undefined
      );
      res.send(
        myTickets.map(ticket => ({
          ...ticket,
          opponentTeam:
            ticket.homeTeam === ticket.myTeam
              ? ticket.awayTeam
              : ticket.homeTeam,
          seasons: ticket.seasons.map(season => season.season),
        }))
      );
    }
  },
};
