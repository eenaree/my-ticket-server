import * as dotenv from 'dotenv';
import type { Options } from 'sequelize';
import { ENV } from '~/typings/db';

dotenv.config();

type Config = {
  [env in ENV]: Options;
};

export const dbConfig: Config = {
  development: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME,
    host: process.env.MYSQL_HOST,
    timezone: process.env.MYSQL_TIMEZONE,
    dialect: 'mysql',
  },
  test: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME,
    host: process.env.MYSQL_HOST,
    timezone: process.env.MYSQL_TIMEZONE,
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME,
    host: process.env.MYSQL_HOST,
    timezone: process.env.MYSQL_TIMEZONE,
    dialect: 'mysql',
  },
};
