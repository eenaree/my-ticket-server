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
  declare opponentTeam: string | null;
  declare UserId: ForeignKey<User['id']>;
  declare SeasonId: ForeignKey<Season['id']>;
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
          type: new DataTypes.VIRTUAL(DataTypes.STRING, [
            'homeTeam',
            'awayTeam',
            'myTeam',
          ]),
          get() {
            return this.get('homeTeam') == this.get('myTeam')
              ? this.get('awayTeam')
              : this.get('homeTeam');
          },
          set() {
            throw new Error('Do not set the `opponentTeam` value');
          },
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
