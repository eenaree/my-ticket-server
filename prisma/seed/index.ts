import db from '~/db';
import { seasons } from './data/seasons';
import { stadiums } from './data/stadiums';
import { teams } from './data/teams';

async function seeding() {
  await db.team.createMany({ data: teams });
  await db.season.createMany({ data: seasons });
  await db.stadium.createMany({ data: stadiums });
}

seeding()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async error => {
    console.error(error);
    await db.$disconnect();
    process.exit(1);
  });
