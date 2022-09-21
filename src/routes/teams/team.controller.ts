import * as express from 'express';
import Team from '@models/team';

interface TypedExpressRequest<T> extends express.Request {
  body: T;
}

export const getMyTeams: express.RequestHandler = async (req, res) => {
  try {
    if (req.user) {
      const teams = await req.user.getTeams();
      res.json(teams);
    }
  } catch (error) {
    console.error(error);
  }
};

export const updateMyTeams = async (
  req: TypedExpressRequest<{ teams: string[] }>,
  res: express.Response
) => {
  try {
    if (req.user) {
      // 기존 팀 리스트를 순회하면서, 새 팀 리스트에 없는 기존 팀만 따로 모아 관계 삭제
      const exTeams = await req.user.getTeams();
      if (exTeams.length > 0) {
        const notExistExTeams = exTeams.filter(exTeam => {
          return (
            req.body.teams.findIndex(newTeam => newTeam == exTeam.team) == -1
          );
        });

        const removeExTeams = notExistExTeams.map(async exTeam => {
          await req.user?.removeTeam(exTeam);
        });
        await Promise.all(removeExTeams);
      }

      // 기존 팀 리스트에 없는 새 팀만 관계 설정 추가
      const addNewTeams = req.body.teams.map(async newTeam => {
        const team = await Team.findOne({ where: { team: newTeam } });
        if (team) {
          const isMyTeam = await req.user?.hasTeam(team);
          if (isMyTeam) return;

          await req.user?.addTeam(team);
        }
      });
      await Promise.all(addNewTeams);

      res.send();
    }
  } catch (error) {
    console.error(error);
  }
};
