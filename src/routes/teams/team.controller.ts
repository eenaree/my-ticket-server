import { Team } from '@prisma/client';
import * as express from 'express';
import { teamService } from '~/services/team';
import { TypedExpressBody } from '~/typings/db';

export const teamController = {
  async getAll(req: express.Request, res: express.Response<Team[]>) {
    if (req.user) {
      const myTeams = (await teamService.getAll(req.user.id)).map(
        team => team.team
      );
      res.send(myTeams);
    }
  },

  async update(
    req: TypedExpressBody<{ teams: string[] }>,
    res: express.Response
  ) {
    if (req.user) {
      await teamService.update(req.user.id, req.body.teams);
      res.send();
    }
  },
};
