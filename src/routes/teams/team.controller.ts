import { Team } from '@prisma/client';
import * as express from 'express';
import db from '~/db';
import { TypedExpressBody } from '~/typings/db';

export const teamController = {
  async getMyTeams(req: express.Request, res: express.Response<Team[]>) {
    try {
      if (req.user) {
        const result = await db.userTeams.findMany({
          where: { userId: req.user.id },
          select: { preference: true, team: true },
          orderBy: { preference: 'asc' },
        });

        res.json(result.map(team => team.team));
      }
    } catch (error) {
      console.error(error);
    }
  },

  async updateMyTeams(
    req: TypedExpressBody<{ teams: string[] }>,
    res: express.Response
  ) {
    try {
      await db.user.update({
        where: { id: req.user?.id },
        data: {
          myTeams: {
            deleteMany: {},
            create: req.body.teams.map((team, index) => ({
              preference: index + 1,
              team: { connect: { team } },
            })),
          },
        },
      });

      res.send();
    } catch (error) {
      console.error(error);
    }
  },
};
