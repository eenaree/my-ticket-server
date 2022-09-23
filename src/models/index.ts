import { Sequelize } from 'sequelize';
import { dbConfig } from '@config';
import { ENV } from '@typings/db';
import Team from './team';
import Team_Fans from './team_fans';
import User from './user';

const env = (process.env.NODE_ENV as ENV) || 'development';
const config = dbConfig[env];

const sequelize = new Sequelize(
  config.database as string,
  config.username as string,
  config.password,
  config
);

User.initialize(sequelize);
Team.initialize(sequelize);
Team_Fans.initialize(sequelize);

User.belongsToMany(Team, { through: 'Team_Fans' });
Team.belongsToMany(User, { through: 'Team_Fans', as: 'Fans' });

export { sequelize };
