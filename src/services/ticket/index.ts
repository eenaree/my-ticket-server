import * as dayjs from 'dayjs';
import db from '~/db';

export interface TicketBody {
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

export const ticketService = {
  create(
    {
      matchDate: { year, month, date },
      seasons,
      homeTeam,
      awayTeam,
      score,
      scoreType,
      myTeam,
      stadium,
    }: TicketBody,
    userId: number
  ) {
    return db.ticket.create({
      data: {
        date: dayjs(`${year}-${month}-${date}`).format('YYYY.MM.DD'),
        homeTeam,
        awayTeam,
        myTeam,
        scoreType,
        homeTeamScore: score.homeTeam,
        awayTeamScore: score.awayTeam,
        user: { connect: { id: userId } },
        stadium: { connect: { stadium } },
        seasons: {
          create: seasons.map(season => ({
            season: { connect: { season } },
          })),
        },
      },
    });
  },

  getAll(userId: number, cursor?: number) {
    return db.ticket.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: 20,
      include: {
        stadium: true,
        seasons: {
          include: { season: true },
        },
      },
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
    });
  },
};
