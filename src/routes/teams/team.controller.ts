import * as express from 'express';
import { db } from '~/models';
import Team from '~/models/team';
import { TypedExpressBody } from '~/typings/db';

export const teamController = {
  async getMyTeams(req: express.Request, res: express.Response<Team[]>) {
    try {
      if (req.user) {
        const teams = await req.user.getTeams();
        const teamPreference = teams.reduce<{ [team: string]: number }>(
          (prev, curr) => {
            return {
              ...prev,
              [curr.team]: curr.Team_Fans.preference,
            };
          },
          {}
        );

        const teamsSortedByPreference = teams.sort(
          (a, b) => teamPreference[a.team] - teamPreference[b.team]
        );

        res.json(teamsSortedByPreference);
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
      if (req.user) {
        const exTeams = await req.user.getTeams();

        // 새 팀 리스트에 없는 기존 팀만 따로 모아 관계 삭제
        const removeNotExistExTeams = exTeams
          .filter(
            exTeam =>
              req.body.teams.findIndex(newTeam => newTeam == exTeam.team) == -1
          )
          .map(exTeam => req.user?.removeTeam(exTeam));

        // 새 팀 리스트에 있는 기존팀의 선호도가 변경된 경우, 선호도만 변경
        const changeExTeamsPreference = exTeams
          .filter(
            exTeam =>
              req.body.teams.findIndex(newTeam => newTeam == exTeam.team) != -1
          )
          .map(exTeam => {
            const newTeamIndex = req.body.teams.findIndex(
              newTeam => newTeam == exTeam.team
            );

            if (newTeamIndex + 1 == exTeam.Team_Fans.preference) return;
            return req.user?.addTeam(exTeam, {
              through: { preference: newTeamIndex + 1 },
            });
          });

        // 기존 팀 리스트에 없는 새 팀만 관계 설정 추가
        const addNewTeamsPreference = req.body.teams.map(
          async (newTeam, index) => {
            const team = await db.Team.findOne({ where: { team: newTeam } });
            if (team) {
              const isMyTeam = await req.user?.hasTeam(team);
              if (isMyTeam) return;

              await req.user?.addTeam(team, {
                through: { preference: index + 1 },
              });
            }
          }
        );

        await Promise.all([
          ...removeNotExistExTeams,
          ...changeExTeamsPreference,
          ...addNewTeamsPreference,
        ]);
        res.send();
      }
    } catch (error) {
      console.error(error);
    }
  },
};
