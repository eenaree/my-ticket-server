import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export default class Team extends Model<
  InferAttributes<Team>,
  InferCreationAttributes<Team>
> {
  declare id: CreationOptional<number>;
  declare team: string;
  declare name: string;

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
        name: {
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
