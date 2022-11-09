import db from '~/db';

export const userService = {
  findById(id: number) {
    return db.user.findUnique({ where: { id } });
  },

  findByProfileId(profileId: string) {
    return db.user.findUnique({
      where: { email: profileId },
    });
  },

  create({
    email,
    nickname,
    provider,
  }: {
    email: string;
    nickname: string;
    provider: string;
  }) {
    return db.user.create({
      data: {
        email,
        nickname,
        provider,
      },
    });
  },
};
