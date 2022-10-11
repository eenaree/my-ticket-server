import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import User from './user';

export default class Ticket extends Model<
  InferAttributes<Ticket>,
  InferCreationAttributes<Ticket>
> {
  declare id: CreationOptional<number>;
  declare date: string;
  declare homeTeam: string;
  declare awayTeam: string;
  declare homeTeamScore: number;
  declare awayTeamScore: number;
  declare scoreType: string;
  declare myTeam: string;
  declare opponentTeam: string;
  declare UserId: ForeignKey<User['id']>;

  static initialize(sequelize: Sequelize) {
    return Ticket.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        date: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        homeTeam: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        awayTeam: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        homeTeamScore: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        awayTeamScore: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        scoreType: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        myTeam: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        opponentTeam: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        charset: 'utf8',
      }
    );
  }
}
