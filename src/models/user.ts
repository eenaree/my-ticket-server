import {
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';
import Team from './team';

export default class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare nickname: string;
  declare provider: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare getTeams: BelongsToManyGetAssociationsMixin<Team>;
  declare addTeam: BelongsToManyAddAssociationMixin<Team, number>;
  declare removeTeam: BelongsToManyRemoveAssociationMixin<Team, number>;
  declare hasTeam: BelongsToManyHasAssociationMixin<Team, number>;

  static initialize(sequelize: Sequelize) {
    return User.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        nickname: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        provider: DataTypes.STRING,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },
      {
        sequelize,
        charset: 'utf8',
      }
    );
  }
}
