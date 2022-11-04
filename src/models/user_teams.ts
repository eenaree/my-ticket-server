import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export default class UserTeams extends Model<
  InferAttributes<UserTeams>,
  InferCreationAttributes<UserTeams>
> {
  declare preference: number;
  declare UserId: number;
  declare TeamId: number;

  static initialize(sequelize: Sequelize) {
    return UserTeams.init(
      {
        preference: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        UserId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
        TeamId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
      },
      {
        tableName: 'user_teams',
        sequelize,
        charset: 'utf8',
        timestamps: false,
      }
    );
  }
}
