import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export default class Season extends Model<
  InferAttributes<Season>,
  InferCreationAttributes<Season>
> {
  declare id: CreationOptional<number>;
  declare season: string;

  static initialize(sequelize: Sequelize) {
    return Season.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        season: {
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
