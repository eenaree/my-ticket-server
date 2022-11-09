import db from '~/db';

export const teamService = {
  getAll(userId: number) {
    return db.userTeams.findMany({
      where: { userId },
      select: { preference: true, team: true },
      orderBy: { preference: 'asc' },
    });
  },

  update(userId: number, myTeams: string[]) {
    return db.user.update({
      where: { id: userId },
      data: {
        myTeams: {
          deleteMany: {},
          create: myTeams.map((team, index) => ({
            preference: index + 1,
            team: { connect: { team } },
          })),
        },
      },
    });
  },
};
