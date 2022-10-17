import * as express from 'express';
import { db } from '@models';
import Season from '@models/season';

interface TypedExpressRequest<T> extends express.Request {
  body: T;
}

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

export const createTicket: express.RequestHandler = async (
  req: TypedExpressRequest<TicketBody>,
  res
) => {
  try {
    const stadium = await db.Stadium.findOne({
      where: { stadium: req.body.stadium },
    });

    if (req.user) {
      const ticket = await db.Ticket.create({
        date: new Date(
          req.body.matchDate.year,
          req.body.matchDate.month - 1,
          req.body.matchDate.date
        ),
        homeTeam: req.body.homeTeam,
        awayTeam: req.body.awayTeam,
        myTeam: req.body.myTeam,
        scoreType: req.body.scoreType,
        homeTeamScore: req.body.score.homeTeam,
        awayTeamScore: req.body.score.awayTeam,
        UserId: req.user.id,
        StadiumId: stadium ? stadium.id : undefined,
      });

      const seasons = await Promise.all(
        req.body.seasons.map(season => db.Season.findOne({ where: { season } }))
      );
      await ticket.addSeasons(
        seasons.filter((season): season is Season => season instanceof Season)
      );
      res.send(ticket);
    }
  } catch (error) {
    console.error(error);
  }
};

export const getMyTickets: express.RequestHandler = async (req, res) => {
  try {
    if (req.user) {
      const tickets = await db.Ticket.findAll({
        where: { UserId: req.user.id },
        include: [{ model: db.Season }, { model: db.Stadium }],
      });

      res.send(tickets);
    }
  } catch (error) {
    console.error(error);
  }
};
