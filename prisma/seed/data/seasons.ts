import { Prisma } from '@prisma/client';

export const seasons: Prisma.SeasonCreateInput[] = [
  { season: '정규시즌' },
  { season: '포스트시즌' },
  { season: '와일드카드 결정전' },
  { season: '준플레이오프' },
  { season: '플레이오프' },
  { season: '한국시리즈' },
];
