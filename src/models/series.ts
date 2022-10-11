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

export default class Series extends Model<
  InferAttributes<Series>,
  InferCreationAttributes<Series>
> {
  declare id: CreationOptional<number>;
  declare series: string;
  declare SeasonId: ForeignKey<Season['id']>;

  static initialize(sequelize: Sequelize) {
    return Series.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        series: {
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
