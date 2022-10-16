import * as express from 'express';
import { db } from '@models';

interface TypedExpressRequest<T> extends express.Request {
  body: T;
}

interface TicketBody {
  matchDate: {
    year: number;
    month: number;
    date: number;
  };
  matchSeason: string;
  matchSeries: string;
  homeTeam: string;
  awayTeam: string;
  score: {
    homeTeam: number;
    awayTeam: number;
  };
  scoreType: string;
  myTeam: string;
  opponentTeam: string;
  stadium: string;
}

export const createTicket: express.RequestHandler = async (
  req: TypedExpressRequest<TicketBody>,
  res
) => {
  try {
    const season = await db.Season.findOne({
      where: { season: req.body.matchSeason },
    });
    const series = await db.Series.findOne({
      where: { series: req.body.matchSeries },
    });
    const stadium = await db.Stadium.findOne({
      where: { stadium: req.body.stadium },
    });

    if (req.user) {
      const ticket = await db.Ticket.create({
        date: req.body.matchDate,
        homeTeam: req.body.homeTeam,
        awayTeam: req.body.awayTeam,
        myTeam: req.body.myTeam,
        opponentTeam: req.body.opponentTeam,
        scoreType: req.body.scoreType,
        homeTeamScore: req.body.score.homeTeam,
        awayTeamScore: req.body.score.awayTeam,
      });

      const addTicketAssociation = [
        req.user.addTicket(ticket),
        season && season.addTicket(ticket),
        series && series.addTicket(ticket),
        stadium && stadium.addTicket(ticket),
      ];
      await Promise.all(addTicketAssociation);
      res.send({ ...ticket, series, season, stadium });
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
        include: [
          { model: db.Season },
          { model: db.Series },
          { model: db.Stadium },
        ],
      });

      res.send(tickets);
    }
  } catch (error) {
    console.error(error);
  }
};
