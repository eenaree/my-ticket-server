import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import Season from './season';
import Series from './series';
import Stadium from './stadium';
import User from './user';

export default class Ticket extends Model<
  InferAttributes<Ticket>,
  InferCreationAttributes<Ticket>
> {
  declare id: CreationOptional<number>;
  declare date: Date;
  declare homeTeam: string;
  declare awayTeam: string;
  declare homeTeamScore: number;
  declare awayTeamScore: number;
  declare scoreType: string;
  declare myTeam: string;
  declare opponentTeam: string;
  declare UserId: ForeignKey<User['id']>;
  declare SeasonId: ForeignKey<Season['id']>;
  declare SeriesId: ForeignKey<Series['id']>;
  declare StadiumId: ForeignKey<Stadium['id']>;

  static initialize(sequelize: Sequelize) {
    return Ticket.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        date: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          set(value: { year: number; month: number; date: number }) {
            this.setDataValue(
              'date',
              new Date(value.year, value.month - 1, value.date)
            );
          },
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
