import { Ticket } from '@prisma/client';
import * as dayjs from 'dayjs';
import * as express from 'express';
import db from '~/db';
import { TypedExpressBody, TypedExpressQuery } from '~/typings/db';

interface TicketBody {
  matchDate: {
    year: number;
    month: number;
    date: number;
  };
  seasons: string[];
  homeTeam: string;
  awayTeam: string;
  score: {
    homeTeam: number;
    awayTeam: number;
  };
  scoreType: string;
  myTeam: string;
  stadium: string;
}

export const ticketController = {
  async createTicket(
    req: TypedExpressBody<TicketBody>,
    res: express.Response<Ticket>
  ) {
    try {
      if (req.user) {
        const seasons = await Promise.all(
          req.body.seasons.map(season =>
            db.season.findUnique({ where: { season } })
          )
        );

        const newTicket = await db.ticket.create({
          data: {
            date: dayjs(
              `${req.body.matchDate.year}-${req.body.matchDate.month}-${req.body.matchDate.date}`
            ).format('YYYY-MM-DD'),
            homeTeam: req.body.homeTeam,
            awayTeam: req.body.awayTeam,
            myTeam: req.body.myTeam,
            scoreType: req.body.scoreType,
            homeTeamScore: req.body.score.homeTeam,
            awayTeamScore: req.body.score.awayTeam,
            user: { connect: { id: req.user.id } },
            stadium: { connect: { stadium: req.body.stadium } },
            seasons: {
              create: seasons.map(season => ({
                season: { connect: { id: season?.id } },
              })),
            },
          },
        });

        res.send(newTicket);
      }
    } catch (error) {
      console.error(error);
    }
  },

  async getMyTickets(
    req: TypedExpressQuery<{ lastId?: string }>,
    res: express.Response
  ) {
    try {
      if (req.user) {
        const tickets = await db.ticket.findMany({
          where: {
            userId: req.user.id,
          },
          orderBy: { date: 'desc' },
          take: 20,
          include: {
            stadium: true,
            seasons: {
              include: { season: true },
            },
          },
          skip: 1,
          cursor: req.query.lastId ? { id: +req.query.lastId } : undefined,
        });

        res.send(
          tickets.map(ticket => ({
            ...ticket,
            opponentTeam:
              ticket.homeTeam === ticket.myTeam
                ? ticket.awayTeam
                : ticket.homeTeam,
            seasons: ticket.seasons.map(season => season.season),
          }))
        );
      }
    } catch (error) {
      console.error(error);
    }
  },
};
