import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize';
import Team_Fans from './team_fans';

export default class Team extends Model<
  InferAttributes<Team>,
  InferCreationAttributes<Team>
> {
  declare id: CreationOptional<number>;
  declare team: string;
  declare Team_Fans: NonAttribute<Team_Fans>;

  static initialize(sequelize: Sequelize) {
    return Team.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        team: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        charset: 'utf8',
        timestamps: false,
      }
    );
  }
}
