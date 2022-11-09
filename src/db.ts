import { PrismaClient } from '@prisma/client';

const db = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

db.$on('query', e => {
  console.log({ Query: e.query, Duration: e.duration });
});

export default db;