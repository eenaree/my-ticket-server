import * as express from 'express';
import { InferAttributes, Op, WhereOptions } from 'sequelize';
import { db } from '@models';
import Season from '@models/season';
import Ticket from '@models/ticket';
import { TypedExpressQuery } from '@typings/db';

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

export const getMyTickets = async (
  req: TypedExpressQuery<{ lastDate?: string; lastId?: string }>,
  res: express.Response<Ticket[]>
) => {
  try {
    if (req.user) {
      let whereClause: WhereOptions<InferAttributes<Ticket>> = {
        UserId: req.user.id,
      };
      if (req.query.lastDate && req.query.lastId) {
        whereClause = {
          UserId: req.user.id,
          [Op.or]: [
            {
              date: {
                [Op.lt]: new Date(req.query.lastDate), // lastDate 이전 날짜 티켓
              },
            },
            {
              [Op.and]: [
                { date: { [Op.eq]: new Date(req.query.lastDate) } },
                { id: { [Op.gt]: req.query.lastId } }, // lastDate 와 동일한 날짜의 티켓이면서 가져오지 않은 티켓
              ],
            },
          ],
        };
      }

      const tickets = await db.Ticket.findAll({
        where: whereClause,
        attributes: {
          exclude: ['UserId', 'StadiumId'],
        },
        include: [
          { model: db.Season, through: { attributes: [] } },
          { model: db.Stadium },
        ],
        order: [['date', 'DESC']],
        limit: 10,
      });

      res.send(tickets);
    }
  } catch (error) {
    console.error(error);
  }
};
