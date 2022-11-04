import { Sequelize } from 'sequelize';
import { dbConfig } from '~/config/config';
import { ENV } from '~/typings/db';
import Season from './season';
import Season_Tickets from './season_tickets';
import Stadium from './stadium';
import Team from './team';
import Ticket from './ticket';
import User from './user';
import UserTeams from './user_teams';

const env = (process.env.NODE_ENV as ENV) || 'development';
const config = dbConfig[env];

const sequelize = new Sequelize(
  config.database as string,
  config.username as string,
  config.password,
  config
);

const db = {
  User: User.initialize(sequelize),
  Team: Team.initialize(sequelize),
  UserTeams: UserTeams.initialize(sequelize),
  Season: Season.initialize(sequelize),
  Stadium: Stadium.initialize(sequelize),
  Ticket: Ticket.initialize(sequelize),
  Season_Tickets: Season_Tickets.initialize(sequelize),
};

User.belongsToMany(Team, { through: 'UserTeams' });
Team.belongsToMany(User, { through: 'UserTeams' });

Team.hasMany(Stadium);
Stadium.belongsTo(Team);

User.hasMany(Ticket);
Ticket.belongsTo(User);

Season.belongsToMany(Ticket, { through: 'Season_Tickets' });
Ticket.belongsToMany(Season, { through: 'Season_Tickets' });

Stadium.hasMany(Ticket);
Ticket.belongsTo(Stadium);

export { sequelize, db };
