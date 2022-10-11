import { Sequelize } from 'sequelize';
import { dbConfig } from '@config';
import { ENV } from '@typings/db';
import Season from './season';
import Series from './series';
import Stadium from './stadium';
import Team from './team';
import Team_Fans from './team_fans';
import Ticket from './ticket';
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
Season.initialize(sequelize);
Series.initialize(sequelize);
Stadium.initialize(sequelize);
Ticket.initialize(sequelize);

User.belongsToMany(Team, { through: 'Team_Fans' });
Team.belongsToMany(User, { through: 'Team_Fans', as: 'Fans' });

Season.hasMany(Series);
Series.belongsTo(Season);

Team.hasMany(Stadium);
Stadium.belongsTo(Team);

User.hasMany(Ticket);
Ticket.belongsTo(User);

Season.hasMany(Ticket);
Ticket.belongsTo(Season);

Series.hasMany(Ticket);
Ticket.belongsTo(Series);

Stadium.hasMany(Ticket);
Ticket.belongsTo(Stadium);

export { sequelize };
