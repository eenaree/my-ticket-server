import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export default class Team_Fans extends Model<
  InferAttributes<Team_Fans>,
  InferCreationAttributes<Team_Fans>
> {
  declare preference: number;

  static initialize(sequelize: Sequelize) {
    return Team_Fans.init(
      {
        preference: {
          type: DataTypes.INTEGER.UNSIGNED,
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
